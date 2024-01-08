import React from "react";
import {List} from "antd"


export function Users(props) {
    const { users } = props

    return (
        <List 
            header={<div>List of users</div>} 
            footer={null} 
            bordered 
            dataSource={users} 
            renderItem={item => ( 
                <List.Item> 
                {item} 
                </List.Item> 
            )} 
      /> 
    )
}