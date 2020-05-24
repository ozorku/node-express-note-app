$(".deleteNote").click(function (e) {
  let note = e.target.value;
  // send ajax request
  $.ajax({
    type: "DELETE",
    url: "/deleteNote/" + note,
    success: function (data) {
      location.reload();
    },
  });
});
