window.app_saku3_transaksi_siaga_hris_kesehatan_fKlaim = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_kesehatan_fKlaim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_kesehatan_fKlaim";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Klaim Asuransi Kesehatan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		uses("saiGrid",true);	
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 

		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Reimburse","Daftar Reimburse"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["No. Klaim","Keterangan","Tgl. Kuitansi","Asuransi","Karyawan"],
					colWidth:[[4,3,2,1,0],[100,100,100,350,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,200,20],caption:"No Klaim",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,14,450,20],caption:"Keterangan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[10,12,100,18],caption:"Tanggal Kuitansi", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[110,12,98,18],date:new Date().getDateStr()}); 
		this.cb_asur = new saiCBBL(this.pc1.childPage[0],{bound:[10,13,220,20],caption:"Asuransi", multiSelection:false, maxLength:10, tag:1});
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[10,16,220,20],caption:"Karyawan", multiSelection:false, maxLength:10, tag:1});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,16,200,20],caption:"Total Klaim", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,20,990,300], childPage:["Item Klaim Asuransi Kesehatan"]});				
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["NIK","No Urut","Nama Pasien","Status","Jenis Perawatan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,150,150,310,80,100]],
					colFormat:[[5],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3],[4,5]],
					buttonStyle:[[0,4],[bsEllips,bsAuto]],
					defaultRow:1,
					picklist:[[4],[new portalui_arrayMap({items:["Rawat Jalan","Rawat Inap"]})]],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager"]});
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan Tertanggung",true);			
			this.cb_asur.setSQL("select kode_asur, nama from gr_asur where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_asur","nama"],false,["Kode","Nama"],"and","Data Asuransi",true);			
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_kesehatan_fKlaim.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_kesehatan_fKlaim.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{
					if (this.stsSimpan == 1) this.doClick(this.i_gen);										
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_klaim_m(no_klaim,kode_lokasi,periode,tanggal,keterangan,tgl_kuitansi,nilai,tgl_input,nik_user,nik_buat,progress,kode_asur,no_pb) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_buat.getText()+"','0','"+this.cb_asur.getText()+"','-')");
							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_klaim_d(no_klaim,kode_lokasi,nik,no_urut,keterangan,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+this.sg.cells(1,i)+",'"+this.sg.cells(4,i)+"',"+parseNilai(this.sg.cells(5,i))+")");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_klaim_m where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_klaim_d where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into gr_klaim_m(no_klaim,kode_lokasi,periode,tanggal,keterangan,tgl_kuitansi,nilai,tgl_input,nik_user,nik_buat,progress,kode_asur,no_pb) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_buat.getText()+"','0','"+this.cb_asur.getText()+"','-')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_klaim_d(no_klaim,kode_lokasi,nik,no_urut,keterangan,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+this.sg.cells(1,i)+",'"+this.sg.cells(4,i)+"',"+parseNilai(this.sg.cells(5,i))+")");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_klaim_m where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_klaim_d where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang dari nol.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang dari nol.");
					return false;						
				}
				else this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);		
	},
	doClick:function(sender){
		if(this.stsSimpan==0) {			
			setTipeButton(tbSimpan);
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_klaim_m","no_klaim",this.app._lokasi+"-KLM"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="" && this.stsSimpan == 0) {			
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.tgl_kuitansi,a.keterangan,a.nik_buat,a.kode_asur "+
					   "from gr_klaim_m a "+
					   "                  inner join gr_asur c on a.kode_asur=c.kode_asur and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_klaim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.dp_d2.setText(line.tgl_kuitansi);					
					this.e_ket.setText(line.keterangan);				
					this.cb_asur.setText(line.kode_asur);					
					this.cb_buat.setText(line.nik_buat);
				} 
			}			
			var data = this.dbLib.getDataProvider("select a.nik,a.no_urut,b.nama,c.nama as sts_kel,a.keterangan,a.nilai "+
				"from gr_klaim_d a "+
				"inner join gr_keluarga b on a.nik=b.nik and a.no_urut=b.no_urut and a.kode_lokasi=b.kode_lokasi "+
				"inner join gr_status_kel c on c.sts_kel=b.sts_kel and c.kode_lokasi=b.kode_lokasi where a.no_klaim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																
					this.sg.appendData([line.nik,line.no_urut,line.nama,line.sts_kel,line.keterangan,floatToNilai(line.nilai)]);
				}
				this.sg.validasi();
			} else this.sg.clear(1);
		}
	},
	doChangeCell: function(sender, col, row) {
		if (col == 0) {
			if (this.sg.dataFromList[0] != "") {
				this.sg.cells(0,row,this.sg.dataFromList[0]);
				this.sg.cells(1,row,this.sg.dataFromList[1]);
				this.sg.cells(2,row,this.sg.dataFromList[2]);
				this.sg.cells(3,row,this.sg.dataFromList[3]);
				this.sg.cells(4,row,"");
				this.sg.cells(5,row,"0");
			}
		}
		if (col == 4) this.sg.validasi();
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(5,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(5,i));			
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Pasien",this.sg, this.sg.row, this.sg.col, 
														"select a.nik,a.no_urut,a.nama,b.nama as status_kel "+
														"from gr_keluarga a "+
														"inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
														"where a.nik='"+this.cb_buat.getText()+"' and a.flag_tanggung='Y' ",
														"select count(a.nik) "+
														"from gr_keluarga a "+
														"inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
														"where a.nik='"+this.cb_buat.getText()+"' and a.flag_tanggung='Y' ",
														 new Array("a.nik","a.no_urut","a.nama","a.status_kel"),"and",new Array("NIK","No Urut","Nama","Status"),false);					
						break;					
												
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},

	doLoad:function(sender){						
		var strSQL = "select a.no_klaim,a.keterangan,convert(varchar,a.tgl_kuitansi,103) as tgl_kuitansi,a.kode_asur+' '+b.nama as asur,a.nik_buat "+
					 "from gr_klaim_m a inner join gr_asur b on a.kode_asur=b.kode_asur and a.kode_lokasi=b.kode_lokasi "+
					 "where a.progress='0' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_klaim desc";		
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
			this.sg1.appendData([line.no_klaim,line.keterangan,line.tgl_kuitansi,line.asur,line.nik_buat]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
