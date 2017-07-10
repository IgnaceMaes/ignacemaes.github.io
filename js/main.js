var totalWork;
var selectedWork = 1;
var minLoadingTime = 500;
var startTime = new Date().getTime();

$(document).ready(function ()
{
    //set heights
    $("#intro").height($(window).height());
    $("#name").css('top', ($(window).height() * 0.8) * 0.3 + "px");
    $("#main").css('top', $(window).height() * 0.8 + "px");
    $(".workleft").height($(window).height() * 0.6);
    $('textarea[name="contactmessage"]').height($(window).height() * 0.3);
    $("#loadingfill").height($(window).height());

    //footer scroll to top
    $("#scrolltotop").click(function ()
    {
        $('html, body').animate(
        {
            scrollTop: 0
        }, 1750);
    });

    //Assign work selector events
    totalWork = $("#workcontent>div").length;
    for (var i = 1; i <= totalWork; i++)
    {
        $("#workselector" + i).click(createCallback(i));
    }

    //Nav clicks
    var totalNavs = $("nav span").length;
    for (var i = 1; i <= totalNavs; i++)
    {
        $("nav span:nth-child(" + i + ")").click(createClickCallback(i));
    }
});

$(window).load(function ()
{
    //Dismiss loading animation
    var timeSinceStart = new Date().getTime() - startTime;
    if (timeSinceStart < minLoadingTime)
    {
        setTimeout(dismissLoading, minLoadingTime - timeSinceStart);
    }
    else
    {
        dismissLoading();
    }
});

function dismissLoading()
{
    $("#loading").css('display', 'none');
    $("#loadingfill").fadeOut(300);
}

function createCallback(i)
{
    return function ()
    {
        setActiveWork(selectedWork, i);
    };
}

function createClickCallback(i)
{
    return function ()
    {
        $('html, body').animate(
        {
            scrollTop: $("#main section:nth-child(" + i + ")").offset().top
        }, 1250);
    };
}

function getNextWork(current, total)
{
    var next = current + 1;
    if (next > total) next = 1;
    return next;
}

function getPreviousWork(current, total)
{
    var previous = current - 1;
    if (previous < 1) previous = total;
    return previous;
}

var isSwitching = false;
function setActiveWork(current, next)
{
    if (isSwitching || current == next) return;
    isSwitching = true;
    //selectors
    $("#workselector" + current).removeClass('workselectorselected');

    $("#workselector" + next).addClass('workselectorselected');

    //content
    $("#work" + current).fadeOut(250, function ()
    {
        //on current faded out
        selectedWork = next;
        $("#work" + next).fadeIn(250, function ()
        {
            //on new faded in
            isSwitching = false;
        });
    });
}
