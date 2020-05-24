// ADD NOTE
$(".addNewNote").click(function () {
  let newNoteValue = $("#newNote").val();
  $.ajax({
    type: "POST",
    url: "/addNote",
    data: { newNote: newNoteValue },
    success: function (data) {
      location.reload();
    },
  });
  // empty input
  $("#newNote").val("");
});

// DELETE NOTE
$(".deleteNote").click(function (e) {
  let note = e.target.value;
  $.ajax({
    type: "DELETE",
    url: "/deleteNote/" + note,
    success: function (data) {
      location.reload();
    },
  });
});
