package model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Point implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean inArea;

    private Date time;

    public Point(double x, double y, double r, int offset) {
        time = new Date();
        time = new Date(time.getTime() - 3 * 1000 * 60 * 60 - offset * 1000 * 60);
        this.x = x;
        this.y = y;
        this.r = r;

        inArea = ((x >= 0 && y <= 0 && y >= (x - r)) || (x <= 0 && y >= 0 && x * x + y * y <= (r / 2) * (r / 2)) || (x >= 0 && y >= 0 && x <= r / 2 && y <= r));
      //  inAr1 = ((x >= 0 && y <= 0 && y >= (x - 1)) || (x <= 0 && y >= 0 && x * x + y * y <= (1 / 2) * (1 / 2)) || (x >= 0 && y >= 0 && x <= 1/ 2 && y <= 1));

    }




    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getTime() {
        return new SimpleDateFormat("dd.MM.yy, HH:mm:ss").format(time);
    }

    public String toString(){
        return "X="+x+", Y="+y+", R="+r+(inArea ? " Yes" : " No");
    }
    public String isInArea(){
        return inArea ? "Yes" : "No";
    }

    //public String isInAr1(){
       // return inAr1 ? "Y1" : "N1";
  //  }
}
