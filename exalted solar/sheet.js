// Global Options
csx_opts = {
	'setupCallback': function(item){chainsawxiv_exalted_setup(item);},
	'uiContainer': function(){return document;},
	'defaultFieldValue':'Click to edit',
	'imagePath':'https://innersecure.net/~omnichr/external/op/dst/images/',
	'preloadFiles':[
		'add.png',
		'add_hover.png',
		'balance.png',
		'balance_hover.png',
		'bold_active.png',
		'bold_hover.png',
		'bullet.png',
		'crunch.png',
		'crunch_hover.png',
		'equipment.png',
		'equipment_hover.png',
		'fb_back_bottom.png',
		'fb_back_main.png',
		'fb_back_top.png',
		'fluff.png',
		'fluff_hover.png',
		'grab.png',
		'grab_hover.png',
		'indent.png',
		'indent_active.png',
		'indent_hover.png',
		'italic.png',
		'italic_active.png',
		'italic_hover.png',
		'magic.png',
		'magic_hover.png',
		'tip.png',
		'tip_hover.png',
		'trash.png',
		'trash_active.png',
		'trash_hover.png',
		'underline.png',
		'underline_active.png',
		'underline_hover.png',
		'solar/pip_off.png',
		'solar/pip_off_hover.png',
		'solar/pip_on.png',
		'solar/pip_on_hover.png',
		'solar/tab01_active.png',
		'solar/tab01_inactive.png',
		'solar/tab02_active.png',
		'solar/tab02_inactive.png',
		'solar/tab03_active.png',
		'solar/tab03_inactive.png',
		'solar/tab04_active.png',
		'solar/tab04_inactive.png',
		'solar/check_off.png',
		'solar/check_off_hover.png',
		'solar/check_on.png',
		'solar/check_on_hover.png',
	],
};

// Master Startup
function chainsawxiv_exalted_dataPostLoad(data){

	csx_opts.defaultContext = document.getElementById(data.containerId);	
	csx_opts.uiContainer = csx_opts.defaultContext.querySelector('.uicontainer');
	csx_opts.isEditable = data.isEditable;

	// Include the shared script file
	var includes = document.createElement('script');
	includes.type = 'text/javascript';
	includes.src = 'https://innersecure.net/~omnichr/external/op/dst/js/csx_exalted_common.js?v=dev001';
	includes.onload = function(){

		// Fix container properties
		csx_firstParentWithClass(csx_opts.defaultContext,'dynamic_sheet_container').style.overflow = 'visible';
		csx_firstParentWithClass(csx_opts.defaultContext,'main-content-container').style.minWidth = '853px';
		
		// Set up the editing interface
		csx_opts.setupCallback();
		
	};
	document.body.appendChild(includes);
	
	// Preload rollover images 
	// Deferred to prevent blocking
	window.setTimeout(function(){
		if (document.images){
			for (var i = 0; i < csx_opts.preloadFiles.length; i++){
				var img = new Image();
				img.src = csx_opts.imagePath + csx_opts.preloadFiles[i];
			}
		}
	},500);
	
}

// Setup After Script Load
function chainsawxiv_exalted_setup(context){

	// Provide default context
	if (context == undefined)
		context = csx_opts.defaultContext;
	
	// Do setup for interfaces
	csx_pips(context);
	csx_check(context);
	csx_edit(context);
	csx_tip(context);
	csx_list(context);
	csx_tab(context);

}

// Shutdown Before Save
function chainsawxiv_exalted_dataPreSave(){

	// Default the context if not set
	var context = csx_opts.defaultContext;

	// Bake everything down to its field values
	var pips = context.querySelectorAll('.pips');
	for (var i = 0; i < pips.length; i++){
		if (pips[i].parentNode.className.match(/proto/))
			continue;
		pips[i].unrender();
	}
	
	var checks = context.querySelectorAll('.check');
	for (var i = 0; i < checks.length; i++)
		checks[i].unrender();

	var edits = context.querySelectorAll('.dsf:not(.readonly),.edit');
	for (var i = 0; i < edits.length; i++)
		edits[i].unrender();

	var lists = context.querySelectorAll('.list');
	for (var i = 0; i < lists.length; i++)
		lists[i].unrender();		
		
}
