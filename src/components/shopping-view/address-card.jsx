import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = () => {
  return (
    <Card>
        <CardContent className='grid gap-4 p-4'>
            <Label>Address: 688/57 Chung cư Osimi, Đường Lê Đức Thọ, Phường 15, Quận Gò Vấp, Thành Phố Hồ Chí Minh</Label>
        </CardContent>
        <CardFooter className='flex justify-between items-center'>
            <Button>Edit</Button>
            <Button>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard