var perform = function(action){
	if (action.name != undefined){
		reformat_page ();
	}
	switch(action.name){
	case 'bigger':
		makeItBigger();
		break;
	case 'classic_filter':
		applyClassicFilter();
		break;
	case 'contrast':
		increaseContrast();
		break;
	default:
	break;	
    }
}

