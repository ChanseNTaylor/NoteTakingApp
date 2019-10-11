`use strict`;
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
    computed:
    {
        classObject()
        {
            return {
                'has-background-warning': this.isDoLater,
                'has-background-success': this.isComplete,
                'has-background-danger': this.isIncomplete,
                'has-background-grey-dark': this.note.isDark && this.isNew,
                'desaturate': this.note.isDark && this.isDoLater || this.note.isDark && this.isComplete || this.note.isDark && this.isIncomplete
            }
        },
        fallenAtLast()
        {
            return {
                'has-text-grey-light': this.isNew,
                'has-text-grey-dark': this.isDoLater,
                'has-text-grey-ter': this.isComplete,
                'has-text-white-ter': this.isIncomplete
            }
        }
    },
    props: [`note`],
    methods:
    {
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
        }
    },
    template:`
    <div class="box is-small is-clearfix" :class="classObject">
        <div class="level is-vcentered is-centered">
            <select class="select" @change="changeNoteColor" v-model="selected">
                <option>New</option>
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <button class="delete" @click="$emit(\`delete\`, note.id)"/>
        </div>
        <textarea rows="1" class="textarea" @change="note.updateModified()"/>
        <p class="is-size-7 is-italic is-pulled-right" :class="fallenAtLast">
            Last Modified: {{ note.lastModified }}
        </p>
    </div>
    `
});

const wrapper = new Vue(
{
    el: `.wrapper`,
    data:
    {
        notes: [],
        darkMode: false,
        time: new Date().toLocaleString(`en-US`,
        {
            month: "long",
            day: "numeric",
            year: "numeric",
            weekday: "short",
        })
    },
    methods:
    {
        toggleDarkMode()
        {
            this.darkMode = !this.darkMode;

            this.notes.forEach(note => { note.isDark = !note.isDark });
        },
        addNewNote()
        {
            this.notes.unshift(
            {
                isDark: this.darkMode,
                id: this.notes.length,
                lastModified: new Date(),
                updateModified() { this.lastModified = new Date(); }
            });
        },
        deleteNote(noteId)
        {
            for(let aa = 0; aa < this.notes.length; aa++)
            {
                if(this.notes[aa].id == noteId)
                {
                    this.notes.splice(aa, 1);
                    break;
                }
            }
        }
    }
});

// TODO
// Add animation to make adding & deleting notes stylish and less disorienting
// Simple animation for toggling dark mode (once everything else is complete)
// learn localStorage and use it to save darkMode state if possible
// look up difference between computed & methods.  I may not need methods for the notes