window.app_saku3_transaksi_siswa_fJadwal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fJadwal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fJadwal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jadwal", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Tahun Ajaran",multiSelection:false,tag:2,change:[this,"doChange"]});			
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Jadwal","Daftar Jadwal"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kode TA","Kode Guru","Kode Matpel","Kelas"],
					colWidth:[[3,2,1,0],[100,250,250,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		

		this.cb_guru = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Guru",multiSelection:false,tag:2,change:[this,"doChange"]});
		this.cb_matpel = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Matpel",multiSelection:false,tag:2,rightVisible:false});						
		this.cb_kelas = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Kode Kelas",multiSelection:false,tag:2,change:[this,"doChange"]});		
		this.bTampil = new button(this.pc1.childPage[0],{bound:[660,13,80,18],caption:"Tampil Data",click:[this,"doCari"]});					
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[775,13,200,20],caption:"Total", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true,change:[this,"doChange"]});			

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,12,990,325], childPage:["Detail Jadwal"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:9,tag:0,
		            colTitle:["Slot","Ket Slot","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"],					
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,180,60]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8]],
					autoAppend:false,defaultRow:1,dblClick:[this,"doDoubleClick2"],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"]});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager2"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			this.cb_guru.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Pegawai",true);			
			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode TA","nama"],"and","Data TA",true);			
			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_kelas","nama"],false,["Kode Kelas","Nama"],"and","Data Kelas",true);			

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
window.app_saku3_transaksi_siswa_fJadwal.extend(window.childForm);
window.app_saku3_transaksi_siswa_fJadwal.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from sis_jadwal where kode_ta = '"+this.cb_ta.getText()+"' and kode_guru = '"+this.cb_guru.getText()+
							"' and kode_matpel = '"+this.cb_matpel.getText()+"' and kode_kelas='"+this.cb_kelas.getText()+"' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'");			

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){		
								for (var j=2;j < 9;j++){
									if(this.sg.cells(j,i) == "ISI"){
										var kodeHari = j-1;
										sql.add("insert into sis_jadwal(kode_slot,kode_lokasi,kode_pp,kode_kelas,kode_hari,kode_ta,kode_guru,kode_matpel) values "+
									    		"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_kelas.getText()+"','"+kodeHari+"','"+this.cb_ta.getText()+"','"+this.cb_guru.getText()+"','"+this.cb_matpel.getText()+"')");
									}
								}
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"));
				setTipeButton(tbSimpan);				
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.pc2.setActivePage(this.pc2.childPage[0]);	
				this.sg.clear();
				this.sg1.clear();
				this.bTampil.show();
				break;
			case "simpan" :	
			case "ubah" :				
				this.simpan();
				break;	
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();					
				sql.add("delete from sis_jadwal where kode_ta = '"+this.cb_ta.getText()+"' and kode_guru = '"+this.cb_guru.getText()+
						"' and kode_matpel = '"+this.cb_matpel.getText()+"' and kode_kelas='"+this.cb_kelas.getText()+"' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'");			
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);
				break;							
		}
	},
	doChange: function(sender){
		try{
			if(this.cb_guru.getText() != ""){
				this.cb_matpel.setSQL("select a.kode_matpel, b.nama from sis_guru_matpel a inner join sis_matpel b on a.kode_matpel=b.kode_matpel and a.kode_lokasi=b.kode_lokasi "+
									  "where a.nik='"+this.cb_guru.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_pp = '"+this.app._kodePP+"'",["kode_matpel","nama"],false,["Kode Matpel","Nama"],"and","Data Matpel",true);	
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doCari:function(sender){								
		this.sg.clear();
		var strSQL = "select a.kode_slot,a.nama "+
					 "from  sis_slot a "+
					 "where a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"'";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line2;			
			for (var i in data.rs.rows){
				line2 = data.rs.rows[i];
				/*
					query ambil jam awal-jam akhir

					select a.*,b.jam_ke, 
						   DATEADD(MINUTE, a.durasi * (b.jam_ke-1), a.jam_awal) as jam_awal,
						   DATEADD(MINUTE, a.durasi * b.jam_ke, a.jam_awal) as jam_akhir
					from sis_hari a
					cross join sis_Slot b 
					where a.kode_lokasi ='12' and a.kode_hari ='1' and b.kode_lokasi='12' and jam_ke is not null


				*/
				var senin=selasa=rabu=kamis=jumat=sabtu=minggu="KOSONG";
				var strSQL2 = "select kode_hari,kode_matpel,kode_guru from sis_jadwal where kode_slot='"+line2.kode_slot+"' and kode_ta='"+this.cb_ta.getText()+"' and kode_kelas='"+this.cb_kelas.getText()+"' and kode_pp='"+this.app._kodePP+"' "; 

				var dataJadwal = this.dbLib.getDataProvider(strSQL2,true);				
				if (typeof dataJadwal == "object" && dataJadwal.rs.rows[0] != undefined){
					var lineJ;			
					for (var j in dataJadwal.rs.rows){
						lineJ = dataJadwal.rs.rows[j];
						if (lineJ.kode_hari == "1") {
							if (lineJ.kode_matpel == this.cb_matpel.getText() && lineJ.kode_guru == this.cb_guru.getText()) senin  = "ISI";
							else senin  = "TERPAKAI";
						}
						if (lineJ.kode_hari == "2") {
							if (lineJ.kode_matpel == this.cb_matpel.getText() && lineJ.kode_guru == this.cb_guru.getText()) selasa  = "ISI";
							else selasa  = "TERPAKAI";
						}
						if (lineJ.kode_hari == "3") {
							if (lineJ.kode_matpel == this.cb_matpel.getText() && lineJ.kode_guru == this.cb_guru.getText()) rabu  = "ISI";
							else rabu  = "TERPAKAI";
						}
						if (lineJ.kode_hari == "4") {
							if (lineJ.kode_matpel == this.cb_matpel.getText() && lineJ.kode_guru == this.cb_guru.getText()) kamis  = "ISI";
							else kamis  = "TERPAKAI";
						}
						if (lineJ.kode_hari == "5") {
							if (lineJ.kode_matpel == this.cb_matpel.getText() && lineJ.kode_guru == this.cb_guru.getText()) jumat  = "ISI";
							else jumat  = "TERPAKAI";
						}
						if (lineJ.kode_hari == "6") {
							if (lineJ.kode_matpel == this.cb_matpel.getText() && lineJ.kode_guru == this.cb_guru.getText()) sabtu  = "ISI";
							else sabtu  = "TERPAKAI";
						}
						if (lineJ.kode_hari == "7") {
							if (lineJ.kode_matpel == this.cb_matpel.getText() && lineJ.kode_guru == this.cb_guru.getText()) minggu  = "ISI";
							else minggu  = "TERPAKAI";
						}
					}
				}				
				this.sg.appendData([line2.kode_slot,line2.nama,senin,selasa,rabu,kamis,jumat,sabtu,minggu]); 
			}
		} else this.sg.clear(1);

		this.sg.validasi();
	},
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 3 || col == 4 || col == 5 || col == 6 || col == 7 || col == 8) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var jumlah = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i)){					
					for (var j = 2; j < 9;j++){
						if (this.sg.cells(j,i) == "ISI") jumlah++;
					}
				}
			}						
			this.e_total.setText(floatToNilai(jumlah));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},

	doDoubleClick2: function(sender, col , row) {
		if (col == 2 || col == 3 || col == 4 || col == 5 || col == 6 || col == 7 || col == 8) {
			if (sender.cells(col,row) == "KOSONG") sender.cells(col,row,"ISI");
			else {
				if (sender.cells(col,row) == "ISI") sender.cells(col,row,"KOSONG");
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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
		var strSQL = "select distinct kode_ta,kode_matpel,kode_guru,kode_kelas from sis_jadwal "+
					 "where kode_ta='"+this.cb_ta.getText()+"' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' order by kode_kelas";		
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
			this.sg1.appendData([line.kode_ta,line.kode_guru,line.kode_matpel,line.kode_kelas]); 
		}
		this.sg1.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.pc2.setActivePage(this.pc2.childPage[0]);	
																	
				this.cb_ta.setText(this.sg1.cells(0,row));	
				this.cb_guru.setText(this.sg1.cells(1,row));	
				this.cb_matpel.setText(this.sg1.cells(2,row));	
				this.cb_kelas.setText(this.sg1.cells(3,row));	
				this.doCari();

				this.bTampil.hide();	
				setTipeButton(tbUbahHapus);						
			}
		} catch(e) {alert(e);}
	}
});
