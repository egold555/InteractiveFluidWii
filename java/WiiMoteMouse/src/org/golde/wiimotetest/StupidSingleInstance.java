package org.golde.wiimotetest;

import java.awt.AWTException;
import java.awt.Dimension;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.event.InputEvent;

import com.github.awvalenti.wiiusej.WiiusejNativeLibraryLoadingException;

import wiiusej.WiiUseApiManager;
import wiiusej.Wiimote;
import wiiusej.wiiusejevents.physicalevents.ExpansionEvent;
import wiiusej.wiiusejevents.physicalevents.IREvent;
import wiiusej.wiiusejevents.physicalevents.MotionSensingEvent;
import wiiusej.wiiusejevents.physicalevents.WiimoteButtonsEvent;
import wiiusej.wiiusejevents.utils.WiimoteListener;
import wiiusej.wiiusejevents.wiiuseapievents.ClassicControllerInsertedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.ClassicControllerRemovedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.DisconnectionEvent;
import wiiusej.wiiusejevents.wiiuseapievents.GuitarHeroInsertedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.GuitarHeroRemovedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.NunchukInsertedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.NunchukRemovedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.StatusEvent;

public class StupidSingleInstance implements WiimoteListener {

	Robot robot;
	Dimension screenSize;
	boolean active = true;
	Wiimote wiimote;

	public void start() {
		screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		try {
			robot = new Robot();
		} catch (AWTException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			Wiimote[] wiimotes = new WiiUseApiManager().getWiimotes(1);
			wiimote = wiimotes[0];
			wiimote.activateIRTRacking();
			wiimote.activateMotionSensing();
			wiimote.addWiiMoteEventListeners(this);
			//wiimote.setSensorBarBelowScreen();
			wiimote.setSensorBarAboveScreen();
			wiimote.setLeds(true, active, active, true);
		} catch (WiiusejNativeLibraryLoadingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	boolean leftHeldDown = false;
	boolean rightHeldDown = false;

	@Override
	public void onButtonsEvent(WiimoteButtonsEvent e) {

		if(e.isButtonHomeJustPressed()) {
			toggleActive();
		}

		if(active) {
			if(e.isButtonBHeld()) {
				robot.mousePress(InputEvent.BUTTON1_MASK);
				leftHeldDown = true;
			}
			else if(leftHeldDown){
				robot.mouseRelease(InputEvent.BUTTON1_MASK);
				leftHeldDown = false;
			}

			else if(e.isButtonAJustPressed()) {
				robot.mousePress(InputEvent.BUTTON3_DOWN_MASK);
				rightHeldDown = true;
			}
			else if(rightHeldDown){
				robot.mouseRelease(InputEvent.BUTTON3_DOWN_MASK);
				rightHeldDown = false;
			}
		}
	}

	@Override
	public void onClassicControllerInsertedEvent(ClassicControllerInsertedEvent e) {}

	@Override
	public void onClassicControllerRemovedEvent(ClassicControllerRemovedEvent e) {}

	@Override
	public void onDisconnectionEvent(DisconnectionEvent e) {}

	@Override
	public void onExpansionEvent(ExpansionEvent e) {}

	@Override
	public void onGuitarHeroInsertedEvent(GuitarHeroInsertedEvent e) {}

	@Override
	public void onGuitarHeroRemovedEvent(GuitarHeroRemovedEvent e) {}

	@Override
	public void onIrEvent(IREvent e) {
		//log("IREvent: " + e.toString());
		if(active) {
			int x = (int) scaleRandge(e.getX(), 0, 560, 0, screenSize.width);
			int y = (int) scaleRandge(e.getY(), 0, 420, 0, screenSize.height);
			robot.mouseMove(x, y);
		}
	}

	@Override
	public void onMotionSensingEvent(MotionSensingEvent e) {}

	@Override
	public void onNunchukInsertedEvent(NunchukInsertedEvent e) {}

	@Override
	public void onNunchukRemovedEvent(NunchukRemovedEvent e) {}

	@Override
	public void onStatusEvent(StatusEvent e) {}

	private void log(String msg) {
		System.out.println(msg);
	}

	float lerp(float a, float b, float f) 
	{
		return (float) ((a * (1.0 - f)) + (b * f));
	}

	float scaleRandge(float x, float low, float high, float outLow, float outHigh) {
		float f = (x - low) / (high - low);
		return lerp(outLow, outHigh, f);
	}

	void toggleActive() {
		this.active = !active;
		wiimote.setLeds(true, active, active, true);
	}

}
