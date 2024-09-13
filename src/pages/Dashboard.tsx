import React, {FC} from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import Icon from '@mui/material/Icon';

import {ICustomer} from "../models/customer.dto";
import {selectCustomerCount, selectCustomerList} from "../redux/features/customer";
import {useAppSelector} from "../hooks/useRedux";

const Dashboard: FC = () => {

    const customerCount: number = useAppSelector(selectCustomerCount);


    return (
        <div className="flex p-10">
            <Card sx={{maxWidth: 345}}>
                <CardActionArea>
                    <CardHeader>
                        <Icon color="secondary" >star</Icon>
                    </CardHeader>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Customers
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                           Customer count: {customerCount}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default Dashboard;
