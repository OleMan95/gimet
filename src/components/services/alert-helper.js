export default (ctx, message, type)=>{
	if(type === 'danger'){
		ctx.setState({
			alert: message,
			alertDangerClass: 'alert-opacity'
		});
		setTimeout(()=>{
			ctx.setState({
				alert: 'Error!',
				alertDangerClass: 'd-none'
			});
		}, 4000);
	}else{
		ctx.setState({
			alert: message,
			alertInfoClass: 'alert-opacity'
		});
		setTimeout(()=>{
			ctx.setState({
				alert: 'Error!',
				alertInfoClass: 'd-none'
			});
		}, 4000);
	}
};