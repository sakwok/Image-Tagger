interface ReduxInitialState {
  apiCalls: ApiInitialState
  loading: LoadingInitialState
  completed: CompletedInitialState
  site: SiteInitialState
}

type ApiInitialState = {
  player: PlayerIdState
}


type CompletedInitialState = { [x: string]: boolean }
type LoadingInitialState = { [x: string]: boolean }
