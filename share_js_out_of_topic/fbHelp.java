// java Program to create a program to measure ocean level
import java.awt.event.*;
import java.text.DecimalFormat;
import java.awt.*; 
import javax.swing.*; 
import java.util.ArrayList;
import java.util.List;

class solve extends JFrame  
{ 

    static JFrame f; 
    static JList oceanLevel; 
    private static DecimalFormat df2;
    public static void main(String[] args) 
    { 
        f = new JFrame("Ocean level"); 
        JPanel p =new JPanel(); 
        df2 = new DecimalFormat("#.##");
        List<String> oceanLevelData = new ArrayList<String>();
        double oldOceanVal = 0.0;
        for(int i = 1; i<= 10 ; i++)
        {
            double douFormula = Math.pow(1.5, i-1);
            oceanLevelData.add(String.valueOf(df2.format(oldOceanVal + douFormula)));
            oldOceanVal = oldOceanVal + douFormula;
        }
        
        //create list 
        oceanLevel = new JList(oceanLevelData.toArray());   
        oceanLevel.setSelectedIndex(2); 
        p.add(oceanLevel); 
        oceanLevel.setPreferredSize(new Dimension(180, 400));
        f.add(p); 
        f.setSize(200,400); 
        f.show(); 
    } 
      
      
} 