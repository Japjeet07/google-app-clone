import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'; 
import { newsData } from '../../dummy-data/news'; 

const NewsList: React.FC = () => {
  return (
    <div className="mt-1 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl w-full px-4">
        {newsData.map((item, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: '#1f1f1f',
              color: 'white',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Image */}
            <CardMedia
              component="img"
              image={item.image}
              alt={item.heading}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'cover',
                margin: '0', // Ensures no margin around the image
              }}
            />

            {/* Card Content */}
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  component="h5"
                  sx={{
                    color: 'white',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2, // Limits the heading to 2 lines
                    WebkitBoxOrient: 'vertical',
                    marginBottom: '4px', // Reduces the gap between the heading and website
                  }}
                >
                  {item.heading}
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: 'white', marginTop: '-10px' }}>
                {item.website}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsList;