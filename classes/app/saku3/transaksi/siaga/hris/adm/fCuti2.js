window.app_saku3_transaksi_siaga_hris_adm_fCuti2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fCuti2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fCuti2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Cuti Bersama", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Pengajuan","Data Pengajuan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["No. Cuti","Tgl Mulai","Tgl Selesai","Sts Cuti","Alasan Cuti"],
					colWidth:[[4,3,2,1,0],[400,100,100,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,200,20],caption:"No Cuti",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_cuti = new saiCBBL(this.pc1.childPage[0],{bound:[10,13,220,20],caption:"Jenis Cuti", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[10,14,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[110,14,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[10,15,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[110,15,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate2"]}); 
		this.e_lama = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,16,200,20],caption:"Jumlah Hari", tipeText:ttNilai, text:"0", readOnly:true});				
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[10,17,220,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.i_hitung = new portalui_imageButton(this.pc1.childPage[0],{bound:[465,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_alasan = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,16,450,20],caption:"Alasan Cuti", maxLength:200});				
		
		this.p1 = new panel(this.pc1.childPage[0],{bound:[10,23,475,250],caption:"Daftar Tanggal Cuti",visible:true});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-25],colCount:1,tag:9,
		            colTitle:["Tanggal"],
					colWidth:[[0],[120]],															
					autoAppend:true,defaultRow:1});		
		
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

			this.cb_cuti.setSQL("select sts_cuti, nama from gr_status_cuti where kode_lokasi='"+this.app._lokasi+"'",["sts_cuti","nama"],false,["Kode","Nama"],"and","Data Jenis Cuti",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fCuti2.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fCuti2.implement({
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

					if (this.stsSimpan == 0) {
						sql.add("delete from gr_cuti_d where no_cuti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}
					sql.add("insert into gr_cuti_d(no_cuti,kode_lokasi,periode,tanggal,sts_cuti,tgl_mulai,tgl_selesai,alasan,nik,tgl_input,nik_user,lama,nik_app)  "+						         
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_cuti.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.e_alasan.getText()+"',nik,getdate(),'"+this.app._userLog+"',"+parseNilai(this.e_lama.getText())+",'"+this.cb_app.getText()+"' from gr_karyawan where flag_aktif <> 'X'"); 							
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',nik,'"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+" 08:00:00','I','CUTI', '"+this.e_nb.getText()+"' from gr_karyawan where flag_aktif <>'X'"); 
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',nik,'"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+" 08:00:00','O','CUTI', '"+this.e_nb.getText()+"' from gr_karyawan where flag_aktif <>'X' "); 
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
			case "ubah" :	
				 this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;					
			case "hapus" :	
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from gr_cuti_d where no_cuti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
				sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){	
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doSelectDate2: function(sender, y,m,d){			
		this.e_lama.setText("0");
		this.sg.clear(1);
	},		
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_cuti_d","no_cuti",this.app._lokasi+"-CBER"+this.e_periode.getText().substr(2,4)+".","000"));
			this.cb_cuti.setFocus();
			this.stsSimpan = 1;
		}	
		else{		
			var data = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"')+1 as jumlah",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				var jumlah = parseInt(line.jumlah);
			}		
			if (this.cb_cuti.getText() == "1") {
				var data = this.dbLib.getDataProvider("select isnull(sum(datediff(day,tgl_mulai,tgl_akhir)+1),0) as libur from gr_libur where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' and tgl_mulai between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"'",true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];				
					
					var lama = jumlah - parseInt(line.libur);
					this.e_lama.setText(floatToNilai(lama));					
				}				
			}
			this.sg.clear(1);
			var j = 0;
			var tanggal = "";
			for (var i=0;i < jumlah;i++){			
				var data = this.dbLib.getDataProvider("select dateadd(day,"+i+",'"+this.dp_d2.getDateString()+"') as tanggal",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];		
					if (this.cb_cuti.getText() == "1") {
						var data2 = this.dbLib.getDataProvider("select tgl_mulai from gr_libur where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' and '"+line.tanggal+"' between tgl_mulai and tgl_akhir",true);			
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){						
						} 
						else {
							tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
							this.sg.cells(0,j,tanggal);
							this.sg.appendRow(1);
							j++;
						}
					} 
					else {
						tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
						this.sg.cells(0,j,tanggal);
						this.sg.appendRow(1);
						j++;
					}
				}
			}		
		}
	},
	doChange:function(sender){
		try{			
			if (sender == this.e_nb && this.e_nb.getText()!="" && this.stsSimpan==0) {
				this.e_alasan.setFocus();
				var data = this.dbLib.getDataProvider(
						   "select distinct a.tanggal,a.sts_cuti,a.tgl_mulai,a.tgl_selesai,a.alasan,a.nik_app,b.nama as nama_app,c.nama as nama_cuti,a.lama "+
						   "from gr_cuti_d a "+
						   "inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
						   "inner join gr_status_cuti c on a.sts_cuti=c.sts_cuti and a.kode_lokasi=c.kode_lokasi "+
						   "where a.no_cuti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.tgl_mulai);
						this.dp_d3.setText(line.tgl_selesai);
						this.e_lama.setText(floatToNilai(line.lama));
						this.e_alasan.setText(line.alasan);
						this.cb_cuti.setText(line.sts_cuti,line.nama_cuti);
						this.cb_app.setText(line.nik_app,line.nama_app);
					} 
				}
				var data = this.dbLib.getDataProvider(
						   "select distinct convert(varchar,tanggal,111) as tanggal from gr_absen_harian_d  "+
						   "where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis ='I' and modul = 'CUTI'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.tanggal]);
					}
				} else this.sg.clear(1);	
			
			}	
		}catch(e){
			systemAPI.alert(e);
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
		var strSQL = "select distinct a.no_cuti,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.sts_cuti+' | '+b.nama as sts_cuti,a.alasan "+
					 "from gr_cuti_d a "+
					 "inner join gr_status_cuti b on a.sts_cuti=b.sts_cuti "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_cuti desc";		
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
			this.sg1.appendData([line.no_cuti,line.tgl_mulai,line.tgl_selesai,line.sts_cuti,line.alasan]); 
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