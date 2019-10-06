`use strict`;
// note component
Vue.component('note',
{
    template:
    `<div class="message is-small">
        <div class="message-header">
            <select class="select">
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <a class="delete"></a>
        </div>
        <section class="message-body">
            <textarea rows="1" class="message-body textarea"></textarea>
        </section>
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
