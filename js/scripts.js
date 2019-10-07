`use strict`;
Vue.component('note',
{
    props: [`note`],
    methods:
    {
        removeNote: function()
        {
            for(let aa = 0; aa < noteSection.notes.length; aa++)
            {
                if(noteSection.notes[aa].id == this.note.id)
                {
                    noteSection.notes.splice(aa, 1);
                }
            }
        },
        changeNoteColor: function()
        {
        }
    },
    template: `<div class="box is-small is-clearfix">
        <div class="level is-vcentered is-centered">
            <select class="select">
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <button class="delete" v-on:click="removeNote"/>
        </div>
        <textarea rows="1" class="textarea"></textarea>
        <p class="is-size-7 is-pulled-right has-text-grey-light">Last Modified: {{ note.lastModified }}</p>
    </div>`
});

// controls the note section that contains the "+ New Note" button and notes
const noteSection = new Vue(
{
    el: `.notes-section`,
    data:
    {
        notes: []
    }
});

// controls the "+ New Note" button
const newNoteButton = new Vue(
{
    el: `.note-button`,
    methods:
    {
        addNewNote: function()
        {
            noteSection.notes.unshift(
            {
                id: noteSection.notes.length,
                lastModified: new Date()
            });
        }
    }
});

// controls the subtitle containing the time
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
// Change colors of the note blocks based on the select value
// Date modified needs to update when the select or text area is changed