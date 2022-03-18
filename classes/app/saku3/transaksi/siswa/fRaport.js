window.app_saku3_transaksi_siswa_fRaport = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fRaport.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fRaport";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Raport Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Tahun Ajaran",multiSelection:false,tag:2,change:[this,"doChange"]});			
		this.c_sem = new saiCB(this,{bound:[20,20,200,20],caption:"Semester",items:["GANJIL","GENAP"], readOnly:true,tag:2,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[20,12,1000,410], childPage:["Data Raport","Daftar Raport"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tahun Ajaran","Semester","NIS"],
					colWidth:[[3,2,1,0],[150,150,150,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_kelas = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Kelas",multiSelection:false,tag:1,change:[this,"doChange"]});	
		this.cb_nis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"NIS",multiSelection:false,tag:1,change:[this,"doChange"]});	
		
		this.bTampil = new portalui_button(this.pc1.childPage[0],{bound:[818,15,80,18],caption:"Load Data",click:[this,"doLoadData1"]});		
		this.bRekon = new button(this.pc1.childPage[0],{bound:[913,15,80,18],caption:"Rekon Nilai", click:[this,"doRekon"]});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,12,990,308], childPage:["Data Matpel","Data Nilai"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:2,
		            colTitle:["Kode Matpel","Nama MatPel", "Nilai"],					
					colWidth:[[2,1,0],[80,250,100]],	
					colFormat:[[2],[cfNilai]],				
					columnReadOnly:[true,[0,1]],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:2,
		            colTitle:["Kode Matpel","Nilai"],					
					colWidth:[[1,0],[80,100]],			
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.doClick();
			this.doLoad();		
			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode TA","nama"],"and","Data TA",true);			
			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_kelas","nama"],false,["Kode Kelas","Nama"],"and","Data Kelas",true);			

			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.cb_ta.setText(line3.kode_ta);	
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fRaport.extend(window.childForm);
window.app_saku3_transaksi_siswa_fRaport.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager2: function(sender,page){
		this.sg2.doSelectPage(page);
	},
	doRekon: function(sender){				
		try {
			for (var i=0;i < this.sg2.getRowCount();i++){
				for (var j=0;j < this.dataJU1.rs.rows.length;j++){
					if (this.dataJU1.rs.rows[j].kode_matpel == this.sg2.cells(0,i)) {						
						this.dataJU1.rs.rows[j].nilai = this.sg.cells(1,j,this.sg2.cells(1,i));
					}
				}																			
			}
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		catch(e) {
			alert(e);
		}
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{
			//if (this.stsSimpan == 1) this.doClick();	
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if (this.stsSimpan == 0) {
						sql.add("delete from sis_raport_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");
						sql.add("delete from sis_raport_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");
					}			

					sql.add("insert into sis_raport_m(no_bukti,kode_ta,kode_sem,kode_kelas,nis,kode_lokasi,kode_pp) values "+
								 "('"+this.e_nb.getText()+"','"+this.cb_ta.getText()+"','"+this.c_sem.getText()+"','"+this.cb_kelas.getText()+"','"+this.cb_nis.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							 sql.add("insert into sis_raport_d(no_bukti,nis,kode_matpel,nilai,kode_pp,kode_lokasi) values "+
									 "('"+this.e_nb.getText()+"','"+this.cb_nis.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._kodePP+"','"+this.app._lokasi+"')");
						}
					}	

					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
						sql.add("delete from sis_raport_m where no_bukti = '"+this.e_nb.getText()+"' and nis = '"+this.cb_nis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");
						sql.add("delete from sis_raport_d where no_bukti = '"+this.e_nb.getText()+"' and nis = '"+this.cb_nis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");					
						setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.sg.clear(1);
				this.sg2.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.doClick();
				break;
			case "simpan" :
			case "ubah" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doLoadData1:function(sender){
		if (this.cb_kelas.getText()!="") {
			var strSQL = "select a.kode_matpel, b.nama,b.kode_jenis,  '0' as nilai "+
						 "from sis_jadwal a inner join sis_matpel b on a.kode_matpel=b.kode_matpel and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_jur in ('-','"+this.kodeJur+"') "+
						 "where a.kode_kelas = '"+this.cb_kelas.getText()+"' and a.kode_ta='"+this.cb_ta.getText()+"' and a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "order by b.kode_jenis,a.kode_matpel";								 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU1 = data;							
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
				this.sgn.rearrange();
				this.doTampilData1(1);
			} else this.sg.clear(1);	
		}
		else {
			system.alert(this,"Kelas harus diisi.","Pilih dari daftar");
		}			
	},
	doTampilData1: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg.appendData([line.kode_matpel,line.nama,line.nilai]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_raport_m","no_bukti",this.app._lokasi+"-RPSIS.","0000"));
			this.stsSimpan = 1;
			this.cb_kelas.setFocus();
			setTipeButton(tbSimpan);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_ta.setText(this.sg1.cells(1,row));
				this.c_sem.setText(this.sg1.cells(2,row));
				this.e_nb.setText(this.sg1.cells(0,row));	
				this.cb_nis.setText(this.sg1.cells(3,row));	
				this.stsSimpan = 0;
				
				var data = this.dbLib.getDataProvider("select a.kode_matpel,a.nilai,b.kode_kelas from sis_raport_d a inner join sis_raport_m b on a.no_bukti=b.no_bukti and a.nis=b.nis where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.cb_kelas.setText(line.kode_kelas);												
					this.sg.appendData([line.kode_matpel,line.nilai]);
				}
			} else this.sg.clear(1);				
							
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan  (No Bukti : "+ this.e_nb.getText()+")","");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			//this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doChange: function(sender){
		try{
			if(sender == this.cb_ta || this.c_sem && this.cb_ta.getText() != "" && this.c_sem.getText() != ""){
				this.doLoad(1);
			}
			if(sender == this.cb_kelas && this.cb_kelas.getText() != ""){
				this.cb_nis.setSQL("select nis, nama from sis_siswa where flag_aktif ='01' and kode_kelas = '"+this.cb_kelas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"' ",["nis","nama"],false,["NIS","Nama"],"and","Data Siswa",true);			

				var strSQL="select kode_jur from sis_kelas where kode_pp='"+this.app._kodePP+"' and kode_kelas= '"+this.cb_kelas.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' ";								
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.kodeJur = line.kode_jur;					
				}
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoad:function(sender){								
		var strSQL = "select * from sis_raport_m where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' and kode_ta='"+this.cb_ta.getText()+"' and kode_sem='"+this.c_sem.getText()+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.kode_ta,line.kode_sem,line.nis]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
