window.app_saku3_transaksi_rkm_fEval = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rkm_fEval.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rkm_fEval";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Evaluasi RKM", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Evaluasi RKM","Daftar Evaluasi RKM"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["No. Bukti","Keterangan"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Nota",click:[this,"doLoad"]});		
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Bukti",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,390,20],caption:"Keterangan", maxLength:50, tag:1});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,12,990,305], childPage:["Data Evaluasi RKM"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:0,
		            colTitle:["Kode PP","Nama PP","Kode Indikator","Keterangan","Kode Akun","Nama Akun","Skor"],					
					colWidth:[[6,5,4,3,2,1,0],[100,200,80,250,100,200,80]],
					buttonStyle:[[4,2,0],[bsEllips,bsEllips,bsEllips]], 				
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],					
					columnReadOnly:[true,[0,1,2,3,4,5]],
					colFormat:[[6],[cfNilai]],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
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
			this.stsSimpan=1;
			this.doLoad();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rkm_fEval.extend(window.childForm);
window.app_saku3_transaksi_rkm_fEval.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if(this.stsSimpan == 0){
						sql.add("delete from rkm_eval_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from rkm_eval_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}	

					sql.add("insert into rkm_eval_m(no_bukti,kode_lokasi,tanggal,periode,keterangan) values "+
						    "	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rkm_eval_d (no_bukti,kode_lokasi,kode_pp,kode_ip,kode_akun,periode,skor) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg.cells(6,i))+")");
							}
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
					sql.add("delete from rkm_eval_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");	
					sql.add("delete from rkm_eval_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");	
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
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan=1;
				this.doClick(this.i_gen);
				this.sg1.clear(1);
				this.sg.clear(1);
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

	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
												  "select kode_pp,nama from rkm_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  "select count(*) from rkm_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  ["kode_pp","nama"],"and",["Kode PP","Nama PP"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar Indikator Penilaian",sender,undefined, 
												  "select kode_ip,nama from rkm_ip where kode_lokasi='"+this.app._lokasi+"' ",
												  "select count(*) from rkm_ip where kode_lokasi='"+this.app._lokasi+"' ",
												  ["kode_ip","nama"],"and",["Kode IP","Nama IP"],false);				
				}
				if (col == 4){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama from masakun ",
												  "select count(*) from masakun ",
												  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},

	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;		
		var tahun;	
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			this.tahun = y;
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},

	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doLoad();
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},

	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rkm_eval_m","no_bukti",this.app._lokasi+"-EV"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan=1;	
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);	
		}
	},

	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select * from rkm_eval_m where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_ket.setText(line.keterangan);
					}
				}

				var strSQL = "select a.kode_pp, b.nama as nama_pp, a.kode_ip, c.nama as nama_ip, a.kode_akun, d.nama as nama_akun, a.skor "+
							 "from rkm_eval_d a "+
							 "inner join rkm_pp b on a.kode_pp = b.kode_pp "+
							 "inner join rkm_ip c on a.kode_ip = c.kode_ip "+
							 "inner join masakun d on a.kode_akun = d.kode_akun "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_pp,line.nama_pp,line.kode_ip,line.nama_ip,line.kode_akun,line.nama_akun,floatToNilai(line.skor)]);
					}
				}									
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
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

	doLoad:function(sender){						
		var strSQL = "select no_bukti,keterangan from rkm_eval_m where kode_lokasi='"+this.app._lokasi+"' ";		
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
			this.sg1.appendData([line.no_bukti,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);

	},

	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
