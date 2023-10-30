import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import './CharacterStyle.css';
import {ICharacter} from "../../interfaces/ICharacter";


interface IProps {
    char: ICharacter | undefined;
}

export const setVoteClass = (vote: string) => {
    if (vote === "Alive") {
        return 'green'
    } else {
        return 'red'
    }
};


const Character: FC<IProps> = ({char}) => {
    return (
        <div className={'character flex'}>
            {char && <>
                <div className={'character-img flex'}>
                    <img src={char.image} alt="picture"/>
                </div>

                <div className={'character-info'}>
                    <NavLink to={char.id?.toString()} className={'width'}>
                        <p className={'width character-info-name'}>{char.name}</p>
                    </NavLink>

                    <div className={'character-info-second width flex'}>
                        <div className={`character-info-second-circle ${setVoteClass(char.status)}`}>
                        </div>

                        <p>{char.status}</p>
                        <p className={'character-info-second-def'}>-</p>
                        <p>{char.species}</p>
                    </div>

                    {char.location &&
                    <div className={'character-info-location width'}>
                        <p className={'character-info-location-text width'}>
                            Last known location:
                        </p>
                        <p className={'character-info-location-title width'}>
                            {char.location.name}
                        </p>
                    </div>
                    }

                    {char.origin &&
                    <div className={'character-info-seen width'}>
                        <p className={'character-info-seen-text width'}>
                            First seen in:
                        </p>
                        <p className={'character-info-seen-title width'}>
                            {char.origin.name}
                        </p>
                    </div>
                    }
                </div>
            </>}
        </div>
    );
};

export {Character};