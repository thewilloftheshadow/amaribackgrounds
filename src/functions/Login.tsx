const Login = async () => {
  const { error } = await window.supabase.auth.signIn({
    provider: 'discord',
  }, {
    // Note: Supabase requires the 'identify' and 'email' scope
    scopes: 'identify email',
    redirectTo: process.env.REACT_APP_ENVIRONMENT === 'development' ? 'http://localhost:3000' : undefined,
  });

  if (error) {
    console.error(error);
    alert('There was an error when trying to sign in. If this problem persists, please report this bug in #website-feedback-bugs in our Discord server. Sorry for any inconveniences caused.');
  };
};

export default Login;
