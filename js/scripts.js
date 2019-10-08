`use strict`;
Vue.component('note',
{
    data()
    {
        return {
            isDoLater: false,
            isComplete: false,
            selected: `Incomplete`
        }
    },
    props: [`note`],
    methods:
    {
        removeNote()
        {
            for(let aa = 0; aa < notesArea.notes.length; aa++)
            {
                if(notesArea.notes[aa].id == this.note.id)
                {
                    notesArea.notes.splice(aa, 1);
                    break;
                }
            }
        },
        changeNoteColor()
        {
            if(this.selected == `Do Later`)
            {
                if(this.isComplete == true)
                {
                    this.isComplete = false;
                }

                this.isDoLater = true;
            }
            else if(this.selected == `Complete`)
            {
                if(this.isDoLater == true)
                {
                    this.isDoLater = false;
                }

                this.isComplete = true;
            }
            else
            {
                this.isDoLater = false;
                this.isComplete = false;
            }
        },
        updateLastModified()
        {
            this.note.lastModified = new Date();
        }
    },
    template: `<div class="box is-small is-clearfix" :class="{ 'has-background-success': isComplete, 'has-background-warning': isDoLater }">
        <div class="level is-vcentered is-centered">
            <select class="select" @change="changeNoteColor" v-model="selected">
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <button class="delete" @click="removeNote"/>
        </div>
        <textarea rows="1" class="textarea" @change="updateLastModified"/>
        <p class="is-size-7 is-pulled-right has-text-grey-light">Last Modified: {{ note.lastModified }}</p>
    </div>`
});

// controls the note section that contains the "+ New Note" button and notes
const notesArea = new Vue(
{
    el: `.section__note-area`,
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
        addNewNote()
        {
            notesArea.notes.unshift(
            {
                id: notesArea.notes.length,
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
// Simple animation to make adding and deleting notes less disorienting?
