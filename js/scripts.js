`use strict`;
Vue.component('note',
{
    template: `<div class="box is-small">
     <div class="level is-vcentered is-centered">
            <select class="select">
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <button class="delete"/>
      </div>
      <textarea rows="1" class="textarea"></textarea>
    </div>`
});

// controls the note section
const noteSection = new Vue(
{
    el: `.notes-section`,
    data:
    {
        notes: []
    }
});

// controls the new note button
const newNoteButton = new Vue(
{
    el: `.note-button`,
    methods:
    {
        addNewNote: function()
        {
            noteSection.notes.unshift({ id: noteSection.notes.length });
        }
    }
});

// controls the subtitle
const time = new Vue(
{
    el: `.header-time`,
    data:
    {
        time: new Date().toLocaleString(`en-US`,
        {
            month: "long",
            day: "numeric",
            year: "numeric",
            weekday: "short",
        })
    }
});

// TODO
// learn how to make the delete buttons function properly
