window.app_saku3_transaksi_ppbs_fPaUsulanRincianPark = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaUsulanRincianPark.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaUsulanRincianPark";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Parking Usulan : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.cb_pp5 = new saiCBBL(this,{bound:[20,16,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.c_status = new saiCB(this,{bound:[700,16,200,20],caption:"Status Data",items:["POSTED","PARKED"], readOnly:true,tag:8, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,600], childPage:["Daftar Usulan","Data Usulan","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		             colTitle:["No Bukti","Tanggal","Kode PP","Nama PP","Kode Akun","Nama Akun","Keterangan","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,200,200,80,150,60,60,100]],readOnly:true,
					colFormat:[[7],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,22,202,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});		
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"NIK Approve",readOnly:true, tag:2});
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Kode PP",readOnly:true, tag:2, change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Kode MTA",readOnly:true, tag:2});
		this.cb_rkm = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Kode RKM",readOnly:true, tag:2, change:[this,"doChange"]});
		this.cb_drk = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Kode DRK",readOnly:true, tag:2});
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[700,15,220,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.p1 = new panel(this.pc1.childPage[1],{bound:[20,23,900,350],caption:"Daftar Usulan Anggaran"});							
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:28,tag:0,
		            colTitle:["Rincian Kegiatan","Satuan","Tarif"
					          ,"Jan Vol","Jan Jml","Feb Vol","Feb Jml","Mar Vol","Mar Jml"  
							  ,"Apr Vol","Apr Jml","Mei Vol","Mei Jml","Jun Vol","Jun Jml"
							  ,"Jul Vol","Jul Jml","Agu Vol","Agu Jml","Sep Vol","Sep Jml"
							  ,"Okt Vol","Okt Jml","Nop Vol","Nop Jml","Des Vol","Des Jml"
					          ,"Total"],
					colWidth:[[27,26, 25,24,23,22,21,20, 19,18,17,16,15,14 ,13,12,11,10,9,8 ,7,6,5,4,3,2 ,1,0],[ 100  ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,80,250]],					
					readOnly:true,
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],[cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.c_tahun2 = new saiCB(this.pc1.childPage[2],{bound:[20,13,180,20],caption:"Tahun",readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_pp2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_akun2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Kode MTA", multiSelection:false, maxLength:10, tag:9});
		this.cb_rkm2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,200,20],caption:"Kode RKM", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_drk2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:9});	
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150, tag:9});	
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.pp=this.dbLib.getPeriodeFromSQL("select kode_pp as periode from agg_user where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' ");
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_pp.setSQL("select kode_pp, nama from agg_pp where tahun='"+this.tahun+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.pp);
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0'  ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			this.cb_rkm.setSQL("select kode_rkm, nama from agg_rkm where kode_lokasi='"+this.app._lokasi+"'  ",["kode_rkm","nama"],false,["Kode","Nama"],"and","Data RKM",true);
			
			this.cb_pp2.setSQL("select kode_pp, nama from agg_pp where tahun='"+this.tahun+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_akun2.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0'  ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			this.cb_rkm2.setSQL("select kode_rkm, nama from agg_rkm where kode_lokasi='"+this.app._lokasi+"'  ",["kode_rkm","nama"],false,["Kode","Nama"],"and","Data RKM",true);

			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}		
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct tahun from agg_pp order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun2.addItem(i,line.tahun);
				}
			}			
			
			this.cb_pp5.setSQL("select kode_pp, nama from agg_pp where tahun='"+this.tahun+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaUsulanRincianPark.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaUsulanRincianPark.implement({	
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
										
					if (this.c_status.getText() == "POSTED") {
						sql.add("insert into agg_usulpark_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_rkm,kode_drk) "+
								"select no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_rkm,kode_drk "+
								"from agg_usul_m where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into agg_usulpark_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
								"select nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total "+
								"from agg_usul_j where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
						
						sql.add("delete from agg_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from agg_usul_j where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from agg_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					else {					
						sql.add("insert into agg_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_rkm,kode_drk) "+
								"select no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_rkm,kode_drk "+
								"from agg_usulpark_m where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
								"select nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total "+
								"from agg_usulpark_j where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
								
						sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
								"select no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,'UMUM' "+
								"from agg_usul_j where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
						sql.add("delete from agg_usulpark_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from agg_usulpark_j where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					setTipeButton(tbSimpan);
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","2"),this.e_nb);
					setTipeButton(tbSimpan);					
					this.sg.clear(1);					
					this.sg1.clear(1);		
					this.pc1.setActivePage(this.pc1.childPage[0]);					
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doChange: function(sender){
		try{
			if ((sender == this.cb_pp5 || sender == this.c_status) && this.cb_pp5.getText() != "" && this.c_status.getText() != ""){
				this.doLoad();
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		this.c_tahun.setText(y+1);		
		this.tahun = this.c_tahun.getText();
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
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
	},
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.c_tahun2.getText() != "") var filter = filter+" and a.tahun = '"+this.c_tahun2.getText()+"' ";
			if (this.cb_pp2.getText() != "") var filter = filter+" and a.kode_pp = '"+this.cb_pp2.getText()+"' ";
			if (this.cb_akun2.getText() != "") var filter = filter+" and a.kode_akun = '"+this.cb_akun2.getText()+"' ";
			if (this.cb_rkm2.getText() != "") var filter = filter+" and a.kode_rkm = '"+this.cb_rkm2.getText()+"' ";
			if (this.cb_drk2.getText() != "") var filter = filter+" and a.kode_drk = '"+this.cb_drk2.getText()+"' ";
			if (this.e_ket2.getText() != "") var filter = filter+" and a.keterangan like '%"+this.cb_drk2.getText()+"%' ";
			if (this.c_status.getText() == "POSTED")
				var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,isnull(d.nilai,0) as nilai "+
						 "from agg_usul_m a "+
						 "inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
						 "inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "left join (select no_usul,kode_lokasi,sum(total) as nilai from agg_usul_j where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.pp+"' group by no_usul,kode_lokasi )d on a.no_usul=d.no_usul and a.kode_lokasi=d.kode_lokasi "+ 
						 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_usul ";	
			else 
				var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,isnull(d.nilai,0) as nilai "+
						 "from agg_usulpark_m a "+
						 "inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
						 "inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "left join (select no_usul,kode_lokasi,sum(total) as nilai from agg_usulpark_j where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.pp+"' group by no_usul,kode_lokasi )d on a.no_usul=d.no_usul and a.kode_lokasi=d.kode_lokasi "+ 
						 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_usul ";	
						 
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(0,row));	
				
				if (this.c_status.getText() == "POSTED") 
					var data = this.dbLib.getDataProvider("select tanggal,tahun,keterangan,nik_app,kode_pp,kode_akun,kode_drk,kode_rkm from agg_usul_m where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				else 
					var data = this.dbLib.getDataProvider("select tanggal,tahun,keterangan,nik_app,kode_pp,kode_akun,kode_drk,kode_rkm from agg_usulpark_m where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.cb_rkm.setText(line.kode_rkm);
						this.dp_d1.setText(line.tanggal);					
						this.e_ket.setText(line.keterangan);
						this.cb_pp.setText(line.kode_pp);
						this.cb_akun.setText(line.kode_akun);
						this.cb_app.setText(line.nik_app);
						this.cb_drk.setText(line.kode_drk);
					} 
				}			
				if (this.c_status.getText() == "POSTED") 
					var strSQL = "select distinct a.nu,a.kode_drk,a.keterangan,a.tarif,a.satuan "+
						",isnull(janvol,0) as janvol,isnull(jantot,0) as jantot "+
						",isnull(febvol,0) as febvol,isnull(febtot,0) as febtot "+
						",isnull(marvol,0) as marvol,isnull(martot,0) as martot "+
						",isnull(aprvol,0) as aprvol,isnull(aprtot,0) as aprtot "+
						",isnull(meivol,0) as meivol,isnull(meitot,0) as meitot "+
						",isnull(junvol,0) as junvol,isnull(juntot,0) as juntot "+
						",isnull(julvol,0) as julvol,isnull(jultot,0) as jultot "+
						",isnull(aguvol,0) as aguvol,isnull(agutot,0) as agutot "+
						",isnull(sepvol,0) as sepvol,isnull(septot,0) as septot "+
						",isnull(oktvol,0) as oktvol,isnull(okttot,0) as okttot "+
						",isnull(nopvol,0) as nopvol,isnull(noptot,0) as noptot "+
						",isnull(desvol,0) as desvol,isnull(destot,0) as destot "+
						",isnull(jantot,0)+isnull(febtot,0)+isnull(martot,0)+isnull(aprtot,0)+isnull(meitot,0)+isnull(juntot,0)+isnull(jultot,0)+isnull(agutot,0)+isnull(septot,0)+isnull(okttot,0)+isnull(noptot,0)+isnull(destot,0) as total "+
						"from agg_usul_j a  "+
						"left join (  "+
						"select nu  "+
						",sum(case when substring(periode,5,2) = '01' then vol else 0 end) as janvol  "+
						",sum(case when substring(periode,5,2) = '01' then total else 0 end) as jantot "+
						",sum(case when substring(periode,5,2) = '02' then vol else 0 end) as febvol "+
						",sum(case when substring(periode,5,2) = '02' then total else 0 end) as febtot "+
						",sum(case when substring(periode,5,2) = '03' then vol else 0 end) as marvol "+
						",sum(case when substring(periode,5,2) = '03' then total else 0 end) as martot "+
						",sum(case when substring(periode,5,2) = '04' then vol else 0 end) as aprvol "+
						",sum(case when substring(periode,5,2) = '04' then total else 0 end) as aprtot "+
						",sum(case when substring(periode,5,2) = '05' then vol else 0 end) as meivol "+
						",sum(case when substring(periode,5,2) = '05' then total else 0 end) as meitot "+
						",sum(case when substring(periode,5,2) = '06' then vol else 0 end) as junvol "+
						",sum(case when substring(periode,5,2) = '06' then total else 0 end) as juntot "+
						",sum(case when substring(periode,5,2) = '07' then vol else 0 end) as julvol "+
						",sum(case when substring(periode,5,2) = '07' then total else 0 end) as jultot "+
						",sum(case when substring(periode,5,2) = '08' then vol else 0 end) as aguvol "+
						",sum(case when substring(periode,5,2) = '08' then total else 0 end) as agutot "+
						",sum(case when substring(periode,5,2) = '09' then vol else 0 end) as sepvol "+
						",sum(case when substring(periode,5,2) = '09' then total else 0 end) as septot "+
						",sum(case when substring(periode,5,2) = '10' then vol else 0 end) as oktvol "+
						",sum(case when substring(periode,5,2) = '10' then total else 0 end) as okttot "+
						",sum(case when substring(periode,5,2) = '11' then vol else 0 end) as nopvol "+
						",sum(case when substring(periode,5,2) = '11' then total else 0 end) as noptot "+
						",sum(case when substring(periode,5,2) = '12' then vol else 0 end) as desvol "+
						",sum(case when substring(periode,5,2) = '12' then total else 0 end) as destot "+
						"from agg_usul_j "+
						"where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by nu) b on a.nu=b.nu  "+
						"where a.no_usul = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				else 
					var strSQL = "select distinct a.nu,a.kode_drk,a.keterangan,a.tarif,a.satuan "+
						",isnull(janvol,0) as janvol,isnull(jantot,0) as jantot "+
						",isnull(febvol,0) as febvol,isnull(febtot,0) as febtot "+
						",isnull(marvol,0) as marvol,isnull(martot,0) as martot "+
						",isnull(aprvol,0) as aprvol,isnull(aprtot,0) as aprtot "+
						",isnull(meivol,0) as meivol,isnull(meitot,0) as meitot "+
						",isnull(junvol,0) as junvol,isnull(juntot,0) as juntot "+
						",isnull(julvol,0) as julvol,isnull(jultot,0) as jultot "+
						",isnull(aguvol,0) as aguvol,isnull(agutot,0) as agutot "+
						",isnull(sepvol,0) as sepvol,isnull(septot,0) as septot "+
						",isnull(oktvol,0) as oktvol,isnull(okttot,0) as okttot "+
						",isnull(nopvol,0) as nopvol,isnull(noptot,0) as noptot "+
						",isnull(desvol,0) as desvol,isnull(destot,0) as destot "+
						",isnull(jantot,0)+isnull(febtot,0)+isnull(martot,0)+isnull(aprtot,0)+isnull(meitot,0)+isnull(juntot,0)+isnull(jultot,0)+isnull(agutot,0)+isnull(septot,0)+isnull(okttot,0)+isnull(noptot,0)+isnull(destot,0) as total "+
						"from agg_usulpark_j a  "+
						"left join (  "+
						"select nu  "+
						",sum(case when substring(periode,5,2) = '01' then vol else 0 end) as janvol  "+
						",sum(case when substring(periode,5,2) = '01' then total else 0 end) as jantot "+
						",sum(case when substring(periode,5,2) = '02' then vol else 0 end) as febvol "+
						",sum(case when substring(periode,5,2) = '02' then total else 0 end) as febtot "+
						",sum(case when substring(periode,5,2) = '03' then vol else 0 end) as marvol "+
						",sum(case when substring(periode,5,2) = '03' then total else 0 end) as martot "+
						",sum(case when substring(periode,5,2) = '04' then vol else 0 end) as aprvol "+
						",sum(case when substring(periode,5,2) = '04' then total else 0 end) as aprtot "+
						",sum(case when substring(periode,5,2) = '05' then vol else 0 end) as meivol "+
						",sum(case when substring(periode,5,2) = '05' then total else 0 end) as meitot "+
						",sum(case when substring(periode,5,2) = '06' then vol else 0 end) as junvol "+
						",sum(case when substring(periode,5,2) = '06' then total else 0 end) as juntot "+
						",sum(case when substring(periode,5,2) = '07' then vol else 0 end) as julvol "+
						",sum(case when substring(periode,5,2) = '07' then total else 0 end) as jultot "+
						",sum(case when substring(periode,5,2) = '08' then vol else 0 end) as aguvol "+
						",sum(case when substring(periode,5,2) = '08' then total else 0 end) as agutot "+
						",sum(case when substring(periode,5,2) = '09' then vol else 0 end) as sepvol "+
						",sum(case when substring(periode,5,2) = '09' then total else 0 end) as septot "+
						",sum(case when substring(periode,5,2) = '10' then vol else 0 end) as oktvol "+
						",sum(case when substring(periode,5,2) = '10' then total else 0 end) as okttot "+
						",sum(case when substring(periode,5,2) = '11' then vol else 0 end) as nopvol "+
						",sum(case when substring(periode,5,2) = '11' then total else 0 end) as noptot "+
						",sum(case when substring(periode,5,2) = '12' then vol else 0 end) as desvol "+
						",sum(case when substring(periode,5,2) = '12' then total else 0 end) as destot "+
						"from agg_usulpark_j "+
						"where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by nu) b on a.nu=b.nu  "+
						"where a.no_usul = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.keterangan,line.satuan,floatToNilai(line.tarif),floatToNilai(line.janvol),floatToNilai(line.jantot),floatToNilai(line.febvol),floatToNilai(line.febtot),floatToNilai(line.marvol),floatToNilai(line.martot),  
																					 floatToNilai(line.aprvol),floatToNilai(line.aprtot),floatToNilai(line.meivol),floatToNilai(line.meitot),floatToNilai(line.junvol),floatToNilai(line.juntot),  	
																					 floatToNilai(line.julvol),floatToNilai(line.jultot),floatToNilai(line.aguvol),floatToNilai(line.agutot),floatToNilai(line.sepvol),floatToNilai(line.septot),  
																					 floatToNilai(line.oktvol),floatToNilai(line.okttot),floatToNilai(line.nopvol),floatToNilai(line.noptot),floatToNilai(line.desvol),floatToNilai(line.destot),
																					 floatToNilai(line.total)]);
					}
					this.sg.validasi();
				} else this.sg.clear(1);	
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){	
		if (this.c_status.getText() == "POSTED") 
			var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,isnull(d.nilai,0) as nilai "+
						 "from agg_usul_m a "+
						 "inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
						 "inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "left join (select no_usul,kode_lokasi,sum(total) as nilai from agg_usul_j where kode_lokasi='"+this.app._lokasi+"' group by no_usul,kode_lokasi )d on a.no_usul=d.no_usul and a.kode_lokasi=d.kode_lokasi "+ 
						 "where a.tahun='"+this.tahun+"' and a.kode_pp='"+this.cb_pp5.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_usul ";		
		else 
			var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,isnull(d.nilai,0) as nilai "+
						 "from agg_usulpark_m a "+
						 "inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
						 "inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "left join (select no_usul,kode_lokasi,sum(total) as nilai from agg_usulpark_j where kode_lokasi='"+this.app._lokasi+"' group by no_usul,kode_lokasi )d on a.no_usul=d.no_usul and a.kode_lokasi=d.kode_lokasi "+ 
						 "where a.tahun='"+this.tahun+"' and a.kode_pp='"+this.cb_pp5.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_usul ";		
						 
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_usul,line.tgl,line.kode_pp,line.nama_pp,line.kode_akun,line.nama_akun,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(27,i) != ""){
					tot += nilaiToFloat(this.sg.cells(27,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	}		
});