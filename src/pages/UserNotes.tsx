import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/axiosConfig";

interface Note {
  _id: string;
  user: string;
  title: string;
  content: string;
  noteDate: string;
  created_at: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface User {
  _id: string;
  UsersNotes: Note[];
  id: string;
}

interface Props {
  userId: any;
  notes : Note[];
}

const UserNotes = ({ userId, notes }: Props) => {

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col p-2 ">
        {notes.map((note) => (
          <div key={note.id} className="flex flex-col">
            <div className="noteDate">{note.noteDate}</div>
            <div className="noteTitle">{note.title}</div>
            <div className="noteContent">{note.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotes;
