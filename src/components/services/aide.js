export function alertHelperTimeoutSuccess(ctx, message) {
  ctx.setState({
    alertHelperOptions: {
      show: true,
      isDanger: false,
      message
    }
  });
  setTimeout(()=>{
    ctx.setState({
      alertHelperOptions: {
        show: false,
        isDanger: true,
        message: ''
      }
    });
  }, 6000);
}
export function alertHelperTimeoutError(ctx, message) {
  ctx.setState({
    alertHelperOptions: {
      show: true,
      isDanger: true,
      message
    }
  });
  setTimeout(()=>{
    ctx.setState({
      alertHelperOptions: {
        show: false,
        isDanger: true,
        message: ''
      }
    });
  }, 6000);
}