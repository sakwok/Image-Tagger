FROM node:11.15-alpine

# 设置npm淘宝源
RUN npm config set registry 'https://registry.npm.taobao.org'

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
  apk --update --no-cache add tzdata git && \
  # 设置时区
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  # 添加log目录
  mkdir -p /log/pm2/log /log/pm2/out /log/pm2/err /log/app && \
  # 安装全局npm包
  # npm i -g pm2@3.5.0 && \
  # 安装pm2插件
  # pm2 install pm2-intercom && pm2 install pm2-logrotate && \
  # 删除安装缓存
  apk del tzdata && \

  rm -rf /tmp/*

WORKDIR /opt

#COPY package.json /opt

#RUN npm i

#RUN npm install acorn

#RUN npm install next@latest

COPY . /opt

RUN ls .next

#RUN npm run build
