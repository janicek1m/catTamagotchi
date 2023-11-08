import React, { FunctionComponent, useState, useEffect } from "react";
import moods from "../lib/moods";
import { reset, load, save } from "../lib/storage";
import { Hunger, Loneliness, Dirtiness, intervals } from "../lib/intervals";
import { ReactComponent as IconNight } from "./icons/night.svg";
import { ReactComponent as IconDay } from "./icons/day.svg";
import { ReactComponent as IconReset } from "./icons/reset.svg";
import { ReactComponent as IconAge } from "./icons/age.svg";
import { ReactComponent as IconHunger } from "./icons/hunger.svg";
import { ReactComponent as IconLoneliness } from "./icons/loneliness.svg";
import { ReactComponent as IconDirtiness } from "./icons/dirtiness.svg";
import { ReactComponent as IconSleepiness } from "./icons/sleepiness.svg";

interface TopBarProps {
  setBirthTime: (a: number | undefined) => void;
  setMood: (a: string) => void;
  mood: string;
  setLightsOff: (a: boolean) => void;
  sleepiness: number;
  age: number;
  lastFed: number;
  lastPetted: number;
  lastCleaned: number;
}

const TopBar: FunctionComponent<TopBarProps> = ({
  setBirthTime,
  setMood,
  mood,
  setLightsOff,
  sleepiness,
  age,
  lastFed,
  lastCleaned,
  lastPetted,
}) => {
  // dark mode
  const [darkmodeIcon, setDarkmodeIcon] = useState(
    load("darkmode") === 1 ? <IconDay /> : <IconNight /> || <IconNight />
  );
  const handleDarkmodeSwitch = () => {
    return (event: React.MouseEvent) =>
      load("darkmode") === 1 ? setLightTheme() : setDarkTheme();
  };
  const setLightTheme = () => {
    const r: HTMLElement = document.querySelector(":root")!;
    r.style.setProperty("--mainClr", "hsl(0, 0%, 10%");
    r.style.setProperty("--softClr", "hsl(0, 0%, 85%");
    r.style.setProperty("--gradClr1", "hsl(53deg 100% 80%)");
    r.style.setProperty("--gradClr2", "hsl(48deg 100% 80%)");
    r.style.setProperty("--gradClr3", "hsl(43deg 100% 81%)");
    r.style.setProperty("--gradClr4", "hsl(37deg 100% 81%)");
    r.style.setProperty("--gradClr5", "hsl(32deg 100% 82%)");
    r.style.setProperty("--gradClr6", "hsl(25deg 100% 83%)");
    r.style.setProperty("--gradClr7", "hsl(19deg 100% 84%)");
    r.style.setProperty("--gradClr8", "hsl(11deg 100% 86%)");
    r.style.setProperty("--gradClr9", "hsl(4deg 100% 87%)");
    r.style.setProperty("--gradClr10", "hsl(356deg 100% 87%)");
    setDarkmodeIcon(<IconNight />);
    setLightsOff(false);
    save("darkmode", 0);
  };

  const setDarkTheme = () => {
    const r: HTMLElement = document.querySelector(":root")!;
    r.style.setProperty("--mainClr", "hsl(0, 0%, 90%");
    r.style.setProperty("--softClr", "hsl(0, 0%, 20%");
    r.style.setProperty("--gradClr1", "hsl(281deg 32% 35%)");
    r.style.setProperty("--gradClr2", "hsl(275deg 33% 34%)");
    r.style.setProperty("--gradClr3", "hsl(269deg 34% 34%)");
    r.style.setProperty("--gradClr4", "hsl(264deg 35% 34%)");
    r.style.setProperty("--gradClr5", "hsl(258deg 36% 34%)");
    r.style.setProperty("--gradClr6", "hsl(251deg 37% 33%)");
    r.style.setProperty("--gradClr7", "hsl(245deg 37% 33%)");
    r.style.setProperty("--gradClr8", "hsl(237deg 41% 32%)");
    r.style.setProperty("--gradClr9", "hsl(230deg 51% 30%)");
    r.style.setProperty("--gradClr10", "hsl(223deg 65% 27%)");
    setDarkmodeIcon(<IconDay stroke="var(--mainClr)" />);
    setLightsOff(true);
    save("darkmode", 1);
  };
  useEffect(() => {
    load("darkmode") === 1 ? setDarkTheme() : setLightTheme(); // initially load darkmode setting
  }, []);
  // reset pet
  const handleReset = () => {
    return (event: React.MouseEvent) => {
      if (window.confirm("Are you sure you want to grow a new cat?")) {
        setBirthTime(undefined);
        setMood(moods.unborn);
        reset();
      }
    };
  };
  if (mood === moods.unborn || mood === moods.hatching) {
    return <div id="topBar"></div>;
  } else {
    return (
      <div id="topBar">
        <span id="uiContainer">
          <div className="uiItem">
            <IconAge />
            <div>
              <p>{(age / 86400).toFixed(1)} days old</p>
            </div>
          </div>
          <div className="uiItem">
            <IconHunger />
            <div
              className="needIndicator"
              style={{ width: `${Hunger.getAmount(lastFed)}%` }}
            ></div>
          </div>
          <div className="uiItem">
            <IconLoneliness />
            <div
              className="needIndicator"
              style={{ width: `${Loneliness.getAmount(lastPetted)}%` }}
            ></div>
          </div>
          <div className="uiItem">
            <IconDirtiness />
            <div
              className="needIndicator"
              style={{ width: `${Dirtiness.getAmount(lastCleaned)}%` }}
            ></div>
          </div>
          <div className="uiItem">
            <IconSleepiness />
            <div
              className="needIndicator"
              style={{
                width: `${
                  Math.floor((sleepiness / intervals.sleepiness) * 100) <= 100
                    ? Math.floor((sleepiness / intervals.sleepiness) * 100)
                    : 100
                }%`,
              }}
            ></div>
          </div>
        </span>
        <button id="darkmodeSwitch" onClick={handleDarkmodeSwitch()}>
          {darkmodeIcon}
        </button>
        <button id="resetButton" onClick={handleReset()}>
          <IconReset />
        </button>
      </div>
    );
  }
};

export default TopBar;
