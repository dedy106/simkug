window.app_saku3_transaksi_siswa_fNilai = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fNilai.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fNilai";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Penilaian Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Tahun Ajaran",multiSelection:false,tag:2,change:[this,"doChange"]});			
		this.c_sem = new saiCB(this,{bound:[20,20,200,20],caption:"Semester",items:["GANJIL","GENAP"], readOnly:true,tag:2,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[20,12,1000,410], childPage:["Data Penilaian","Daftar Penilaian"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["No Bukti","Tahun Ajaran","Semester","Kelas","Matpel","Jenis Penilaian","Ke-"],
					colWidth:[[6,5,4,3,2,1,0],[80,150,150,150,150,150,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_kelas = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Kelas",multiSelection:false,tag:1,change:[this,"doChange"]});	
		this.cb_matpel = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Matpel",multiSelection:false,tag:1,change:[this,"doChange"]});	
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Jenis Penilaian",multiSelection:false,tag:1,change:[this,"doChange"]});	
		this.e_ke = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Penilaian Ke-",tag:1, readOnly:true, tipeText:ttNilai,text:"0"});
		this.bTampil = new portalui_button(this.pc1.childPage[0],{bound:[225,18,80,18],caption:"Data Siswa",click:[this,"doLoadData1"]});		
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,12,990,260], childPage:["Data Siswa","Data Nilai","Error Msg"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:2,
		            colTitle:["NIS","Nama","Nilai"],					
					colWidth:[[2,1,0],[80,300,150]],					
					columnReadOnly:[true,[0,1]],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,700,this.pc2.height-35],colCount:3,tag:2,
		            colTitle:["NIS","Nilai","Validasi NIS"],					
					colWidth:[[2,1,0],[100,80,150]],			
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});		

		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPage3"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		this.bRekon = new button(this.pc2.childPage[1],{bound:[720,10,80,18],caption:"Rekon NIS", click:[this,"doRekon"]});

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	

			this.stsSimpan = 1;

			this.doClick();
			this.doLoad();		
			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode TA","nama"],"and","Data TA",true);			
			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_kelas","nama"],false,["Kode Kelas","Nama"],"and","Data Kelas",true);						
			this.cb_jenis.setSQL("select kode_jenis, nama from sis_jenisnilai where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_jenis","nama"],false,["Kode Jenis Nilai","Nama"],"and","Data Jenis Nilai",true);			

			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
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
window.app_saku3_transaksi_siswa_fNilai.extend(window.childForm);
window.app_saku3_transaksi_siswa_fNilai.implement({
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
					if (this.dataJU1.rs.rows[j].nis == this.sg2.cells(0,i)) {												
						this.dataJU1.rs.rows[j].nilai = this.sg2.cells(1,i);												
					}
				}																			
			}
			this.doTampilData1(1);

			//cek NIS
			var strSQL = "select nis from sis_siswa where kode_kelas = '"+this.cb_kelas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataNIS = dataS;
			}				

			this.inValid = false;
			for (var i=0; i < this.sg2.getRowCount();i++){
				this.sg2.cells(3,i,"INVALID");
				for (var j=0;j < this.dataNIS.rs.rows.length;j++){
					if (this.sg2.cells(0,i) == this.dataNIS.rs.rows[j].nis) {
						this.sg2.cells(2,i,"VALID");				
					}
				}	
				if (this.sg2.cells(2,i) == "INVALID") this.inValid = true;									
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[2]);	
				this.sg3.clear();
				setTipeButton(tbAllFalse);	
				for (var i=0; i < this.sg2.getRowCount();i++) {
					if (this.sg2.cells(2,i) == "INVALID") {
						var j = i+1;	
						this.sg3.appendData([j]);
					}
				}
			}
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.pc2.setActivePage(this.pc2.childPage[0]);
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
			if (this.stsSimpan == 1) this.doClick();	
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from sis_nilai where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'");
						sql.add("delete from sis_nilai_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'");
					}			

					sql.add("insert into sis_nilai_m(no_bukti,kode_ta,kode_kelas,kode_matpel,kode_jenis,kode_sem,tgl_input,nu,kode_lokasi,kode_pp) values "+
								 "('"+this.e_nb.getText()+"','"+this.cb_ta.getText()+"','"+this.cb_kelas.getText()+"','"+this.cb_matpel.getText()+"','"+this.cb_jenis.getText()+"','"+this.c_sem.getText()+"',getdate(),"+this.e_ke.getText()+",'"+this.app._lokasi+"','"+this.app._kodePP+"')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								 sql.add("insert into sis_nilai(no_bukti,nis,nilai,kode_lokasi,kode_pp) values "+
										 "('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._lokasi+"','"+this.app._kodePP+"')");
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
						sql.add("delete from sis_nilai where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'");
						sql.add("delete from sis_nilai_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'");					
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
				this.sg.clear();
				this.sg2.clear();
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
	doLoadData1:	function(sender){
		if (this.cb_kelas.getText()!="") {
			var strSQL = "select nis,nama,'0' as nilai from sis_siswa where flag_aktif='01' and kode_kelas = '"+this.cb_kelas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ";						
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
			this.sg.appendData([line.nis,line.nama,line.nilai]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},	
	doClick:function(sender){			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_nilai_m","no_bukti",this.app._lokasi+"-BNSIS.","0000"));
			this.stsSimpan = 1;
			this.cb_matpel.setFocus();
			setTipeButton(tbSimpan);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan=0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select a.nis,a.nilai,b.nama from sis_nilai a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp = '"+this.app._kodePP+"' order by a.nis";														
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.nis,line1.nama,line1.nilai]);
					}
				} else this.sg.clear(1);
				
				var strSQL = "select * from sis_nilai_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
					this.cb_kelas.setText(line.kode_kelas);
					this.cb_matpel.setText(line.kode_matpel);
					this.cb_jenis.setText(line.kode_jenis);	
					this.e_ke.setText(line.nu);
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
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doChange: function(sender){
		try{
			if(sender == this.cb_ta || this.c_sem && this.cb_ta.getText() != "" && this.c_sem.getText() != ""){
				this.doLoad();
			}
			if ((sender == this.cb_ta || this.c_sem || this.cb_kelas || this.cb_matpel || this.cb_jenis) && this.cb_ta.getText() != "" && this.c_sem.getText() != "" && this.cb_kelas.getText() != "" && this.cb_matpel.getText() != "" && this.cb_jenis.getText() != "") {	
				if (this.stsSimpan == 1) {
					var strSQL="select COUNT(*)+1 as jumlah from sis_nilai_m where kode_pp='"+this.app._kodePP+"' and kode_ta= '"+this.cb_ta.getText()+"' and kode_sem= '"+this.c_sem.getText()+"' and kode_kelas= '"+this.cb_kelas.getText()+"' and kode_matpel= '"+this.cb_matpel.getText()+"' and kode_jenis= '"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";								
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" &&  data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];
						this.e_ke.setText(line.jumlah);						
					}
				}
			}

			if (sender == this.cb_kelas && this.cb_kelas.getText()!="") {
				var strSQL="select kode_jur from sis_kelas where kode_pp='"+this.app._kodePP+"' and kode_kelas= '"+this.cb_kelas.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' ";								
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.kodeJur = line.kode_jur;
					
					this.cb_matpel.setSQL("select kode_matpel, nama from sis_matpel where kode_jur in ('-','"+this.kodeJur+"') and kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_matpel","nama"],false,["Kode Matpel","Nama"],"and","Data Matpel",true);			
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoad:function(sender){								
		var strSQL = "select * from sis_nilai_m where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' and kode_ta='"+this.cb_ta.getText()+"' and kode_sem='"+this.c_sem.getText()+"' ";		
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
			this.sg1.appendData([line.no_bukti,line.kode_ta,line.kode_sem,line.kode_kelas,line.kode_matpel,line.kode_jenis,line.nu]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
