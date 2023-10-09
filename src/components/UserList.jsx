import React, { useState } from 'react';
import styled from 'styled-components';

// Styled-components definitions
const TableWrapper = styled.div`
  margin: 20px auto;
  max-width: 800px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TableHeader = styled.thead`
  background-color: #007bff;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const UserList = ({ users }) => {
    const [editUserData, setEditUserData] = useState(null);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [userList, setUserList] = useState(users);
  
    // Function to edit an existing user
    const editUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${editUserData.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editUserData.updatedData),
        });
        if (response.ok) {
          // Update the user list with the edited user
          const updatedList = userList.map((user) =>
            user.id === editUserData.userId ? { ...user, ...editUserData.updatedData } : user
          );
          setUserList(updatedList);
          // Clear editUserData
          setEditUserData(null);
        } else {
          console.error(`Error updating user with ID ${editUserData.userId}`);
        }
      } catch (error) {
        console.error(`There was an error updating the user:`, error);
      }
    };
  
    // Function to delete a user
    const deleteUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${deleteUserId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Remove the deleted user from the user list
          const updatedList = userList.filter((user) => user.id !== deleteUserId);
          setUserList(updatedList);
          // Clear deleteUserId
          setDeleteUserId(null);
        } else {
          console.error(`Error deleting user with ID ${deleteUserId}`);
        }
      } catch (error) {
        console.error(`There was an error deleting the user:`, error);
      }
    };
  
    return (
      <TableWrapper>
        <h2>User List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {userList.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <EditButton onClick={editUser}>
                    Edit
                  </EditButton>
                  <DeleteButton onClick={deleteUser}>Delete</DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    );
  };
  
  export default UserList;
