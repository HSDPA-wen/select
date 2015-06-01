var selectFed=function(arg){
    /*
     * 模拟下拉框
     * selectFed({
     * selectContainer:""  box Id/Class
     * optionList:[] 传入选择的数组
     * chooseChecked:false 多选/单选；默认false：单选
     * })
     */
    /*
    **初始化对象
    */
    var defaultArgs = {
        selectContainer:"",
        optionList:[],
        chooseChecked:false
    };
    var usArg = $.extend({},defaultArgs,arg)
        ,selectContainer= $(usArg.selectContainer)
        ,selectTxt = $(".area_txt",selectContainer)
        ,selectIcon = $('.pro_manage_icon',selectContainer)
        ,selectCon = $('.area_con',selectContainer);

    /*
    **重置、导入选择数据
    */
    selectTxt.html("");
    selectCon.html("");
    if(usArg.chooseChecked){
        for(var i=0;i<usArg.optionList.length;i++){
            selectCon.append('<li class="clearfix"><input type="checkbox" class="fl radio_choose" id="check_rz'
                            +i+'" /><label for="check_rz'
                            +i+'" class="fl radio_choose_txt">'
                            +usArg.optionList[i]
                            +'</label></li>');
        }
    }else{
        for(var i=0;i<usArg.optionList.length;i++){
            selectCon.append('<li><a href="javascript:void(0);">'+usArg.optionList[i]+'</a></li>');
        }
    }
    /*
    ** 点击展开select
    */
    selectTxt.unbind('click').bind('click',function(_this){
        var _this = $(this);
        simulateSelectFun(_this);
    });
    selectIcon.unbind('click').bind('click',function(_this){
        var _this = $(this);
        simulateSelectFun(_this);
    });

    /*
    ** 模拟selcet具体操作
     */
    function simulateSelectFun(_this){
        var selectContainer = _this.parent(selectContainer)
            ,thisStConChildren = selectContainer.children()
            ,thisSelectCon = thisStConChildren.filter(selectCon);
        if(thisSelectCon.css('display')=='block'){
            thisSelectCon.hide();
        }else{
            $(usArg.selectCon).hide();
            thisSelectCon.show();
        }
        /*
        ** 单选/多选点击执行函数
        */
        if(usArg.chooseChecked){
            thisSelectCon.find('.radio_choose').change(function(event){
                event ? event.stopPropagation() : event.cancelBubble = true;
                var _this=$(this);
                if(_this.is(':checked')){
                    _this.parent("li").addClass('on');
                }else{
                    _this.parent("li").removeClass('on');
                }
                var text=selectedCity(_this);
                thisStConChildren.filter(selectTxt).text(text);
                //thisSelectCon.hide();
            });
            function selectedCity(_this){
                var _text=[];
                _this.closest("ul").find(".on").each(function(){
                    _text.push($(this).text());
                });
                return _text.join("、");
            }
        }else{
            thisSelectCon.find("li").on("click",function(){
               $(this).addClass('on').siblings("li").removeClass('on');
                $(this).parents(usArg.selectContainer).find(".area_txt").text($(this).text());
                thisSelectCon.hide();
            })

        }

        /*
        ** select 以外区域关闭模拟select
         */
        $(document).click(function(event){
            if(thisSelectCon.css('display')=='block'){
                var elem = $(event.target);
                if(elem.closest(usArg.selectContainer).length == 0){
                    thisSelectCon.hide();
                }
            }
        });
    }
}


