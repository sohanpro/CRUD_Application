import {create} from "zustand"
import axios from "axios";
const useNoteStore = create((set)=>
({
    notes: [],

    createForm: {
        title:"",
        body:"",
        type: "note"
    },

    fetchNotes: async()=>
    {
        try {
            const res = await axios.get("http://localhost:3000/notes");
            //set to state
          set({
            notes: res.data.note
           
          })
          } catch (error) {
            console.error("Error fetching notes:", error);
          }
          
    },

    updateCreateField: (e) =>
    {
        const { name, value } = e.target;

        set((state)=>
        {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value
                }
            }
        })
    // setCreateForm({
    //   ...createForm,
    //   [name]: value,
    // });
    },
    createNote : async (e)=>
    {
        try {
            const {createForm, notes} = useNoteStore.getState();
           const res =  await axios.post("http://localhost:3000/create", createForm);
            //make the input field empty after add the note

            set({notes: [...notes,res.data.note]});
            createForm({
              title: "",
              body: "",
              type: "note",
            });
          } catch (error) {
            console.error("Error creating note:", error);
          }
    },
    Deletenote : async(_id)=>
    {
        //delete the note
    await axios.delete(`http://localhost:3000/delete-note/${_id}`);
    //update the state
    const  {notes} = useNoteStore.getState()
   
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    set({notes: newNotes})

    //setNotes(newNotes);
    }
}))

export default useNoteStore;