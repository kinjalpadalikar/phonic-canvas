var perform = function(action){
	if (action.name != undefined){
		reformat_page ();
	}
	if (action.confidence < 0.5){
		return;
	}
	switch(action.name){
	case 'bigger':
		makeItBigger("#filter_box_image");
		break;
	case 'classic_filter':
		applyClassicFilter("#filter_box_image");
		break;
	case 'contrast':
		increaseContrast("#filter_box_image");
		break;
	case 'exposure':
		increaseExposure("#filter_box_image");
		break;
	case 'brightness':
		increaseBrightness("#filter_box_image");
		break;
	case 'smaller':
		makeItSmaller("#filter_box_image");
		break;
	case 'retro_filter':
		applyRetroFilter("#filter_box_image");
		break;
	case 'lomo_filter':
		applyLomoFilter("#filter_box_image");
		break;
	case 'black_and_white_filter':
		applyBlackAndWhiteFilter("#filter_box_image");
		break;
	case 'sepia_filter':
		applySepiaFilter("#filter_box_image");
		break;
	case 'hdr_filter':
		applyHdrFilter("#filter_box_image");
		break;
	case 'reset':
		resetImage("#filter_box_image");
		break;
	case 'sharpen':
		sharpenImage("#filter_box_image");
		break;
	case 'blur':
		blurImage("#filter_box_image");
		break;			
	default:
	break;	
    }
}

