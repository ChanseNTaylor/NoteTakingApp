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
        dateModifiedColor()
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
        setNoteStatus()
        {
            this.isNew = false;
            this.isDoLater = false;
            this.isComplete = false;
            this.isIncomplete = false;

            if(this.selected == "Do Later")
            {
                this.isDoLater = true;
                this.note.status = "Do Later";
            }
            else if(this.selected == "Complete")
            {
                this.isComplete = true;
                this.note.status = "Complete";
            }
            else if(this.selected == "Incomplete")
            {
                this.isIncomplete = true;
                this.note.status = "Incomplete";
            }
            else
            {
                this.isNew = true;
                this.note.status = "New";
            }
        },
    },
    template:`
    <div class="box is-small is-clearfix" :class="setNoteColor">
        <div class="level is-vcentered is-centered">
            <select class="select" @change="setNoteStatus" v-model="selected">
                <option>New</option>
                <option>Incomplete</option>
                <option>Do Later</option>
                <option>Complete</option>
            </select>
            <a class="delete" @click="$emit('delete', note.id)"/>
        </div>
        <textarea rows="1" class="textarea" @change="note.setDateModified()"/>
        <p class="is-size-7 is-italic is-pulled-right transitions" :class="dateModifiedColor">
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
        localStorage: false,
        numOfNotes(str = "New")
        {
            return this.notes.filter(note => note.status == str).length;
        },
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
        darkWrapper()
        {
            return {
                "is-dark": this.darkMode,
                "is-light": !this.darkMode
            }
        },
        darkStats()
        {
            return {
                "very-dark": this.darkMode,
                "stats__container--expanded": this.noteStats
            }
        },
        darkObj()
        {
            return {
                "light": !this.darkMode,
                "very-dark": this.darkMode
            }
        },
        darkModeText()
        {
            return {
                "has-text-grey-light": this.darkMode,
            }
        },
        stats()
        {
            return {
                "is-hidden": !this.noteStats
            }
        }
    },
    beforeMount()
    {
        // The code below prevents accidental refreshes leading to data loss.
        window.onbeforeunload = () => "";

        try
        {
            if(window.localStorage)
            {
                this.localStorage = true;

                if(window.localStorage.getItem(`darkMode`) !== null)
                {
                    this.darkMode = true;
                }
            }
        }
        catch(err) { console.warn("LocalStorage is not supported."); }
    },
    methods:
    {
        toggleDarkMode()
        {
            if(this.localStorage)
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
                status: "New",
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
