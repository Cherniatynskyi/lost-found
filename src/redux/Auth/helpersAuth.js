export const handlePending = state => {
    state.isRefreshing = true;
  };
  
  export const handleFulfilledLogin = (state, { payload }) => {
    state.isRefreshing = false;
    state.error = '';
    state.token = payload.token;
    state.tokenExpiration = payload.expiresIn;
    state.user = payload.user;
    state.isLoggedIn = true;
  };
  
  export const handleFulfilledRegister = (state, { payload }) => {
    state.isRefreshing = false;
    state.error = '';
    state.token = payload.token;
    state.tokenExpiration = payload.expiresIn;
    state.user = payload.user;
    state.isLoggedIn = true;
  };
  
  export const handleFulfilledProfile = (state, { payload }) => {
    state.isRefreshing = false;
    state.error = '';
    state.user = payload;
  };
  
  export const handleFulfilledLogout = (state, _) => {
    state.isRefreshing = false;
    state.error = '';
    state.user = {name: null, email: null};
    state.token = null;
    state.tokenExpiration = null;
    state.isLoggedIn = false;
  };
  
  export const handleFulfilledFetchCurrentUser = (state, { payload }) => {
    state.isRefreshing = false;
    state.user = payload;
    state.isLoggedIn = true;
  };
  
  export const handleFulfilledUpdateUserData = (state, { payload }) => {
    state.isRefreshing = false;
    state.user = payload;
  };
  
  export const handleRejected = (state, { payload }) => {
    state.isRefreshing = false;
    state.error = payload;
  };