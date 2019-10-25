import { Counter, Histogram, register, collectDefaultMetrics } from 'prom-client'

// URL -> 响应时间
// metric type: Histogram (buckets:0.1s, 0.5s, 1s, 5s, 10s)
// 指标名称 http_response_duration_s
// 例子
// http_response_duration_s(job="pre-game-das-api",uri="/webservice/lol/gaming",method="GET") 0.2
const ResponseTime = new Histogram(
  {
    name: 'http_response_duration_s',
    help: 'http response time',
    labelNames: ['uri', 'method'],
    buckets: [0.1, 0.5, 1, 5, 10]
  }
)

// metric type: Counter
// 指标名称 http_response_status_count
// 需要记录的标签
// status HTTP 状态码
// 例子:
// http_response_status_count(job="pre-game-das-api",uri="/webservice/lol/gaming",method="GET",status=400) 2
const RequestCount = new Counter({
  name: 'http_response_status_count',
  help: 'http response count',
  labelNames: ['uri', 'method', 'status']
})

const prometheusMiddleware = () => {
  return async (ctx, next) => {
    collectDefaultMetrics({})

    if (ctx.request.path === '/metrics' && ctx.method.toLowerCase() === 'get') { // 获取监控信息
      return ctx.body = register.metrics()
    } else { // 统计监控信息
      const start = Date.now()

      await next()

      const { method, prometheus } = ctx.request
      if (prometheus && prometheus.uri) {
        const duration = Date.now() - start
        const { status } = ctx.response

        ResponseTime.observe({ uri: prometheus.uri, method }, duration / 1000)
        RequestCount.inc({ uri: prometheus.uri, method, status }, 1)
      }
    }
  }
}

export default prometheusMiddleware
