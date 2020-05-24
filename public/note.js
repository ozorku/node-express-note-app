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

// TOGGLE EDIT NOTE VISIBLITY
$(".note-message").click(function (e) {
  let getEditInput = e.target.parentNode.nextElementSibling;
  function toggleEditOption() {
    if (getEditInput.hasAttribute("style")) {
      e.target.parentNode.setAttribute("style", "display: none");
      getEditInput.removeAttribute("style");
    } else {
      getEditInput.setAttribute("style", "display: none");
    }
  }
  toggleEditOption();
});

// UPDATE NOTE updateNote
$(".updateNote").click(function (e) {
  let getUpdatedValue = e.target.previousElementSibling.value;
  let noteId = e.target.value;
  $.ajax({
    type: "PATCH",
    url: "/updateNote/" + noteId,
    data: { note: getUpdatedValue },
    success: function (data) {
      console.log(data);
      location.reload();
    },
  });
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
