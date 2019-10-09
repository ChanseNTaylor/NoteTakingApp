`use strict`;
Vue.prototype.$darkMode = false;

Vue.component('note',
{
    data()
    {
        return {
            selected: `New`,
            isNew: true,
            isDoLater: false,
            isComplete: false,
            isIncomplete: false
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
            this.isNew = false;
            this.isDoLater = false;
            this.isComplete = false;
            this.isIncomplete = false;

            if(this.selected == `Do Later`)
            {
                this.isDoLater = true;
            }
            else if(this.selected == `Complete`)
            {
                this.isComplete = true;
            }
            else if(this.selected == `Incomplete`)
            {
                this.isIncomplete = true;
            }
            else
            {
                this.isNew = true;
            }
        },
        updateLastModified()
        {
            this.note.lastModified = new Date();
        }
    },
    template: `<div class="box is-small is-clearfix" :class="{ 'has-background-success': isComplete, 'has-background-warning': isDoLater, 'has-background-danger': isIncomplete }">
        <div class="level is-vcentered is-centered">
            <select class="select" @change="changeNoteColor" v-model="selected">
                <option>New</option>
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <button class="delete" @click="removeNote"/>
        </div>
        <textarea rows="1" class="textarea" @change="updateLastModified"/>
        <p class="is-size-7 is-italic is-pulled-right" :class="{ 'has-text-grey-light': isNew, 'has-text-grey-dark': isDoLater, 'has-text-grey-ter': isComplete, 'has-text-white-ter': isIncomplete }">Last Modified: {{ note.lastModified }}</p>
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

// controls the dark mode toggle button on the navbar
const darkModeToggle = new Vue(
{
    el: `.navbar__toggle`,
    methods:
    {
        toggleDarkMode()
        {
            console.log(this.$darkMode);
            this.$darkMode = true;
            console.log(this.$darkMode);
        }
    }
});

// TODO
// Simple animation to make adding and deleting notes stylish and less disorienting?
// Complete dark mode
    // learn localStorage and use it to save darkMode state if possible
