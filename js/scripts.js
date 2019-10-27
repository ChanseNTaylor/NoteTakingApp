"use strict";
Vue.component("note",
{
    data()
    {
        return {
            selected: "New",
            isNew: true,
            isDoLater: false,
            isComplete: false,
            isIncomplete: false
        }
    },
    computed:
    {
        setNoteColor()
        {
            return {
                'has-background-warning': this.isDoLater,
                'has-background-success': this.isComplete,
                'has-background-danger': this.isIncomplete,
                'has-background-grey-dark': this.note.isDark && this.isNew,
                'desaturate': this.note.isDark && !this.isNew
            }
        },
        setDateModifiedColor()
        {
            return {
                'has-text-grey-light': this.isNew,
                'has-text-grey-dark': this.isDoLater,
                'has-text-grey-ter': this.isComplete,
                'has-text-white-ter': this.isIncomplete
            }
        }
    },
    props: ["note"],
    methods:
    {
        setNoteColor()
        {
            this.isNew = false;
            this.isDoLater = false;
            this.isComplete = false;
            this.isIncomplete = false;

            if(this.selected == "Do Later")
            {
                this.isDoLater = true;
            }
            else if(this.selected == "Complete")
            {
                this.isComplete = true;
            }
            else if(this.selected == "Incomplete")
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
    <div class="box is-small is-clearfix" :class="setNoteColor">
        <div class="level is-vcentered is-centered">
            <select class="select" @change="setNoteColor" v-model="selected">
                <option>New</option>
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <button class="delete" @click="$emit('delete', note.id)"/>
        </div>
        <textarea rows="1" class="textarea" @change="note.setDateModified()"/>
        <p class="is-size-7 is-italic is-pulled-right" :class="setDateModifiedColor">
            Last Modified: {{ note.lastModified }}
        </p>
    </div>`
});

const wrapper = new Vue(
{
    el: `.wrapper`,
    data:
    {
        notes: [],
        darkMode: false,
        noteStats: false,
        time: new Date().toLocaleString(`en-US`,
        {
            month: "long",
            day: "numeric",
            year: "numeric",
            weekday: "short",
        })
    },
    computed:
    {
        wrapperColorObj()
        {
            return {
                "dark": this.darkMode,
                "light": !this.darkMode
            }
        },
        navbarColorObj()
        {
            return {
                "is-dark": this.darkMode,
                "is-light": !this.darkMode
            }
        }
    },
    beforeMount()
    {
        if(window.localStorage)
        {
            if(window.localStorage.getItem(`darkMode`) !== null)
            {
                this.darkMode = true;
            }
        }
    },
    methods:
    {
        toggleDarkMode()
        {
            if(window.localStorage)
            {
                if(window.localStorage.getItem(`darkMode`) === null)
                {
                    window.localStorage.setItem(`darkMode`, `true`);
                }
                else
                {
                    window.localStorage.removeItem(`darkMode`);
                }
            }

            this.darkMode = !this.darkMode;

            this.notes.forEach(note => { note.isDark = !note.isDark });
        },
        toggleNoteStats()
        {
            this.noteStats = !this.noteStats;
        },
        addNewNote()
        {
            this.notes.unshift(
            {
                isDark: this.darkMode,
                id: this.notes.length,
                lastModified: new Date(),
                setDateModified() { this.lastModified = new Date(); }
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
