import { render } from '@testing-library/react';
import React from 'react';
import RaceList from './race.list';

////////////////
// TEST SUITE //
////////////////

describe('Race List Component', () => {

    it('should create', () => {
        let component = render(<RaceList items={[]} seasonWinnerId="" />);
        expect(component).toBeTruthy();
    });

    // Todo => test with items
});