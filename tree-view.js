var bindCollapseEvent = function() {
    $('.tree-element-behavior').click(function() {
        var leaves = $(this).parent().children('.tree-element-child');
        if (leaves.is(':hidden')) {
            leaves.slideDown('slow');
        } else {                        
            leaves.slideUp('slow', function() { 
                leaves.hide(); 
            });
        }
    });
};