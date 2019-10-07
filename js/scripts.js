`use strict`;
Vue.component('note',
{
    props: [`note`],
    methods:
    {
        removeNote: function()
        {
            console.log(this.note.id)
            for(let aa = 0; aa < noteSection.notes.length; aa++)
            {
                if(noteSection.notes[aa].id === this.note.id)
                {
                    console.log(noteSection.notes[aa].id, aa);
                    noteSection.notes.splice(aa, 1);
                }
            }
        }
    },
    template: `<div class="box is-small">
        <div class="level is-vcentered is-centered">
            <select class="select">
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <button class="delete" v-on:click="removeNote"/>
        </div>
        <textarea rows="1" class="textarea"></textarea>
        <p class="is-size-7">Last Modified: {{ note.lastModified }}</p>
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
            console.log(`length: ${noteSection.notes.length}`);
            noteSection.notes.unshift(
            {
                id: noteSection.notes.length,
                lastModified: new Date()
            });
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
