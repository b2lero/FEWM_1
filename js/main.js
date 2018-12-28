$().ready(function() {
  $("#btn-login").click(function() {
    if ($(this).hasClass("btn-outline-success")) {
      localStorage.clear();
      $(this)
        .removeClass("btn-outline-success")
        .addClass("btn-primary")
        .html([
          '<i class="fa fa-sign-in mr-2" aria-hidden="true"></i>',
          "Log in"
        ]);
      // simulation 'redirect home'
        $("#app")
            .load("./views/home.html")
            .show();

    } else {
      $("#modal-login").modal('show');
    }
  });

  $("#btn-login-submit").on("click", function() {
    // Sign in
    let username = $("#login-username").val();


    let psw = $("#login-password").val();

    let url = "http://fenw.etsisi.upm.es:1723/users/login/";
    let urlUser = "http://fenw.etsisi.upm.es:1723/users/";

    //Error
    //If user exist
    $.get(urlUser + username, function(data) {
      console.log(data);
      $(".user").removeClass("d-block");
    })
      .done(function() {
        $.ajax({
          url: url,
          type: "GET",
          dataType: "Json",
          data: {
            username: username,
            password: psw
          }
        })
          .done(function(res, status, auth) {
            $(".psw").hide();
            let tolken = auth.getResponseHeader("Authorization");
            localStorage.setItem("token", tolken);
            $("input").val("");
            $("#modal-login").modal("hide");

            $("#btn-login")
              .removeClass("btn-primary")
              .addClass("btn-outline-success")
              .html([
                '<i class="fa fa-sign-out mr-2" aria-hidden="true"></i>',
                "Log out"
              ]);
          })
          .fail(function() {
            $(".psw").addClass("d-block");
          });
      })
      .fail(function(res) {
        console.log(res.responseText);
        $(".user").addClass("d-block");
        $(".psw").removeClass("d-block");
      });
  });

  $("#modal-login").on("hide.bs.modal", function() {
      $(".user").removeClass("d-block");
      $(".psw").removeClass("d-block");
      console.log("hiding");
  });

  // Routes

  $("#app")
    .load("./views/home.html")
    .show();

  $("#link_home").on("click", function() {
    $("#app")
      .load("./views/home.html")
      .show();
  });

  $("#link_servicios").on("click", function() {
    $("#app")
      .load("./views/servicios.html")
      .show();
  });

  $("#link_instalaciones").on("click", function() {
    $("#app")
      .load("./views/instalaciones.html")
      .show();
  });

  $("#link_reservar").on("click", function() {
    $("#app")
      .load("./views/reservar.html")
      .show();
  });

  $("#btn-register").on("click", function() {
    $("#app")
      .load("./views/register.html")
      .show();
  });
}); // end ready
