let url = document.getElementById('txt-url');
let submitBtn = document.getElementById('btn-submit');

function showLoading(){
    $("#search-cta+div.loading").remove();
    let div = $("<div>");
    let span = $("<span>");
    div.addClass("loading");
    span.addClass("loader");
    div.append(span);
    $("#search-cta").after(div);
}
function removeLoading(){
    $("#search-cta+div.loading").remove();
}

$('.stdmax__sicon').on( "click", function(){
    $('.stdmax-smenu ,.stdmax-header ,.stdmax-adashboard').toggleClass('stdmax-close');
});

function submitButtonClick(get, download) {
  return (event) => {
    event.preventDefault();
    getImage(get, download);
  };
}

function getImage(get, download) {
    let formData = {
        csrfmiddlewaretoken: csrftoken,
        url: url.value,
    };
    $.ajax({
        type: "POST",
        url: get,
        data: formData,
        dataType: "json",
        encode: true,
        beforeSend: function () {
            showLoading();
        }
    }).done(function (data) {
        removeLoading();
        if (data.code == 0) {
            $('#search-cta').after(`
            <div class="loading">
                <div class="d-flex d-block">
                    <span class="fs-3 me-2">😧</span><span class="text-danger">${data.msg}</span>
                </div>
            </div>`)

        }
        if (data.code == 1) {
            let i = btoa(JSON.stringify(data));
            window.location.href = download +'?i=' + i;
            $("#searchdata").submit();
        }
    }).fail(function (data) {
        removeLoading();
        $('#search-cta').after(`
        <div class="loading">
            <div class="d-flex d-block">
                <span class="fs-3 me-2">😧</span><span class="text-danger">Request failed. Please try again.</span>
            </div>
        </div>
        `)
    });
}
