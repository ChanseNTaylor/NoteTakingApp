`use strict`;
// note component
Vue.component('note',
{
    template: `
    <div class="level">
        <select class="select">
            <option> DONE </option>
            <option> Incomplete </option>
            <option> TODO </option>
        </select>
        <a class="delete"></a>
        <textarea class="textarea" placeholder="text goes here"></textarea>
    </div>`
});

// controls the note section
const noteSection = new Vue(
{
    el: '.notes-section'
});

// controls the new note button
const newNoteButton = new Vue(
{
    el: `.note-button`,
    methods:
    {
        addNewNote: function()
        {
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
// add new notes on click
// make the delete button function properly