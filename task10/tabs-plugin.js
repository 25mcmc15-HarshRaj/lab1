(function($){

    $.fn.simpleTabs = function(options){

        let settings = $.extend({
            activeClass: "active",
            speed: 300,
            defaultTab: null
        }, options);

        return this.each(function(){

            let container = $(this);
            let tabs = container.find(".tabs li");
            let contents = container.find(".tab-content");

            // Hide all content
            contents.hide();

            // Determine default tab
            let initialTab = settings.defaultTab;

            // If URL hash exists
            if(window.location.hash){
                initialTab = window.location.hash.substring(1);
            }

            if(!initialTab){
                initialTab = tabs.first().data("tab");
            }

            activateTab(initialTab);

            // Click event
            tabs.on("click", function(){

                let tabName = $(this).data("tab");
                activateTab(tabName);

                // Update URL hash
                window.location.hash = tabName;
            });

            // Keyboard navigation
            tabs.on("keydown", function(e){

                let index = tabs.index(this);

                if(e.key === "ArrowRight"){
                    let next = (index + 1) % tabs.length;
                    tabs.eq(next).focus().click();
                }

                if(e.key === "ArrowLeft"){
                    let prev = (index - 1 + tabs.length) % tabs.length;
                    tabs.eq(prev).focus().click();
                }
            });

            function activateTab(tabName){

                tabs.removeClass(settings.activeClass);
                contents.hide();

                tabs.filter("[data-tab='"+tabName+"']")
                    .addClass(settings.activeClass);

                container.find("#"+tabName)
                    .fadeIn(settings.speed);
            }

        });
    };

})(jQuery);