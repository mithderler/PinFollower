import React from 'react';

function En() {
  return (
    <div className='space-y-4 leading-relaxed'>
      <Heading>What is Pinfollower?</Heading>
      <p>
        Pinfollower is a place where you can explore places to visit,
        restaurants, events and much more.
      </p>
      <p>
        You can create a Pin for anywhere you go and share it with your
        followers. Similarly, you can explore the Pins of the people you follow.
      </p>
      <p>
        You can add your Pins or Pins created by others to your board and group
        these pins.
      </p>
      <Heading>Create Pins</Heading>
      <p>
        You can create a Pin and talk about the places you have visited with
        your followers. If you went to a restaurant, you could share the food
        you like with photos. If you went to a beautiful scene at the top of the
        mountain, you could share your emotions with your photos.
      </p>
      <p>
        Write down your title to create a Pin and enter the Pin’s location. You
        can add a cover photo and cover photo description for the feed. You can
        add Pin details to the Pin description field with photos. If you want,
        you can also add tags for the Pin. For example, if you created a Pin for
        a restaurant, you could add <i>restaurant</i> and <i>food</i> tags.
      </p>
      <Heading>Create Boards</Heading>
      <p>
        You can create a board to group the Pins you created or Pins you liked.
      </p>
      <p>
        For example, you went to Cappadocia for 3-4 days. You eat, drink coffee,
        took a hot air balloon tour and drive ATV in Cappadocia. You can create
        a Pin for each activity you have done. Grouping your Cappadocia Pins
        will work well for you and your followers. To do that, you can create a
        board called Cappadocia and add your related Pins to this board.
      </p>
      <p>
        This board can be public or private. When it is private, no one else can
        see your board. You can create a private board when you plan your trip
        and add the Pins you like to this board.
      </p>
    </div>
  );
}

const Heading = ({ children }) => (
  <h3 className='text-xl font-semibold'>{children}</h3>
);

export default En;
