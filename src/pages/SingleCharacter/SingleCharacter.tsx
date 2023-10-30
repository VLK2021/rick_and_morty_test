import React, {FC, useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import './SingleCharacterStyle.css';
import {RootState} from "../../store";
import {ICharacter} from "../../interfaces/ICharacter";
import {setVoteClass} from '../../components';
import {AiOutlineArrowLeft} from "react-icons/ai";


//отримую одного унікального обєкта не по запиту а з масиву який маємо в сторі щоб не дидосити сервак,
// але при потребі можна і по запиту(вони доречі вмістом одинакові)
const SingleCharacter: FC = () => {
    const {results} = useSelector((store: RootState) => store.characters);
    const {id} = useParams();
    const [singleCh, setSingleCh] = useState<ICharacter>();

    useEffect(() => {
        if (typeof id === "string") {
            const characterId: number = parseInt(id, 10);
            const filtered = results.find(obj => obj.id === characterId);
            if (filtered) {
                setSingleCh(filtered);
            }
        }
    }, [id, results]);


    return (
        <div className={'singleCharacter width flex-direction'}>
            <NavLink to={'/'}>
                <button className="singleCharacter-btn"><AiOutlineArrowLeft className={'icon'}/>go back</button>
            </NavLink>

            {
                singleCh &&
                <div className={'singleCharacter-block flex'}>
                    <div className={'singleCharacter-block-img flex'}>
                        <img src={singleCh?.image} alt="picture"/>
                    </div>

                    <div className={'singleCharacter-block-info'}>
                        <p className={'width singleCharacter-block-info-name'}>{singleCh?.name}</p>

                        <div className={'singleCharacter-block-info-second width flex'}>
                            <div
                                className={`singleCharacter-block-info-second-circle ${setVoteClass(singleCh?.status)}`}>
                            </div>

                            <p>{singleCh?.status}</p>
                            <p className={'singleCharacter-block-info-second-def'}>-</p>
                            <p>{singleCh?.species}</p>
                        </div>

                        {singleCh.location &&
                        <div className={'singleCharacter-block-info-location width'}>
                            <p className={'singleCharacter-block-info-location-text width'}>
                                Last known location:
                            </p>
                            <p className={'singleCharacter-block-info-location-title width'}>
                                {singleCh?.location?.name}
                            </p>
                        </div>
                        }

                        {singleCh.origin &&
                        <div className={'singleCharacter-block-info-seen width'}>
                            <p className={'singleCharacter-block-info-text width'}>
                                First seen in:
                            </p>
                            <p className={'singleCharacter-block-info-title width'}>
                                {singleCh?.origin?.name}
                            </p>
                        </div>
                        }

                        <div className={'singleCharacter-block-info-seen width'}>
                            <p className={'singleCharacter-block-info-text width'}>
                                Other info:
                            </p>
                            <p className={'singleCharacter-block-info-other width'}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur deserunt dolorem,
                                doloremque impedit, labore libero minima nihil pariatur placeat possimus qui quod rem
                                sit, veritatis voluptates. Perferendis quidem rem vitae.
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export {SingleCharacter};