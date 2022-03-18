window.app_saku3_transaksi_ginas_barang_fHpp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ginas_barang_fHpp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ginas_barang_fHpp";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hitung HPP Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Barang","List Jurnal HPP"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[600,180,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad1 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Nota",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:100});								
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[650,14,80,18],caption:"Load Data",click:[this,"doLoadData"]});		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[760,14,200,20],caption:"Total HPP", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,328], childPage:["Detail Barang","Error Brg"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,		            
					colTitle:["Kode Barang","Nama","Pabrik","Kode PP","Satuan","Jumlah","Harga Avg","Nilai HPP"],					
					colHide:[[2],[true]],				
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,300,100]],						
					readOnly:true,colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
				
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:1,tag:9,		            
					colTitle:["Kode Barang"],					
					colWidth:[[0],[200]],						
					readOnly:true,autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		

		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ginas_barang_fHpp.extend(window.portalui_childForm);
window.app_saku3_transaksi_ginas_barang_fHpp.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																								
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {						
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from brg_hpp_d where no_hpp = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update trans_m set no_ref1='-' where form='BRGHPP' and no_ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}										

					//reverse
					if (this.e_periode.getText().substr(4,2) !="01") {
						sql.add("update trans_m set no_ref1='"+this.e_nb.getText()+"' where substring(periode,1,4)='"+this.e_periode.getText().substr(0,4)+"' and form='BRGHPP' and no_ref1='-' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
								"select '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"',a.no_dokumen,'"+this.dp_d1.getDateString()+"',a.nu,a.kode_akun,case a.dc when 'D' then 'C' else 'D' end,a.nilai,a.nilai_curr,'Reverse HPP '+a.no_bukti,a.modul,a.jenis,a.kode_curr,a.kurs,a.kode_pp,a.kode_drk,a.kode_cust,a.kode_vendor,a.no_fa,a.no_selesai,a.no_ref1,a.no_ref2,a.no_bukti "+
								"from trans_j a inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
								"where b.no_ref1='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.no_ref3='-'");
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGHPP','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','Jurnal HPP No: "+this.e_nb.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','-','-','-')");

					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];	
						if(parseFloat(line.hpp) != 0){											
							sql.add("insert into brg_hpp_d (no_hpp,kode_lokasi,kode_barang,satuan,jumlah,h_avg,nilai_hpp,kode_gudang,kode_pp,akun_pers,akun_hpp) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_barang+"','"+line.sat_kecil+"',"+parseFloat(line.jumlah)+","+parseFloat(line.h_avg)+","+parseFloat(line.hpp)+",'"+line.kode_gudang+"','"+line.kode_pp+"','"+line.akun_pers+"','"+line.akun_hpp+"')");																					
						}
					}

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select no_hpp,kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,akun_hpp,'D',sum(nilai_hpp),sum(nilai_hpp),'"+this.e_ket.getText()+"','IV','HPP','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from brg_hpp_d "+
							"where no_hpp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_hpp,kode_lokasi,akun_hpp,kode_pp");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select no_hpp,kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,akun_pers,'C',sum(nilai_hpp),sum(nilai_hpp),'"+this.e_ket.getText()+"','IV','BRG','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from brg_hpp_d "+
							"where no_hpp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_hpp,kode_lokasi,akun_pers,kode_pp");

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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);
												
				}
				break;
			case "simpan" :	
			case "ubah" :			
				this.preView = "1";			
				if (this.brgIlegal == 1) {
					system.alert(this,"Terdapat Barang yang belum terdaftar.","Silahkan Sinkronisasi Data Master.");
					return false;
				} 									
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}		
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from brg_hpp_d where no_hpp = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update trans_m set no_ref1='-' where form='BRGHPP' and no_ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg.clear(1);				
				this.e_total.setText("0");
				this.bTampil.setVisible(true);
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-HP"+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			if (this.stsSimpan == 1) this.doClick();
		}catch(e) {alert(e);}
	},					
	doLoadData:function(sender){		
		this.nik_user=this.app._userLog;								
		var sql = "call sp_brg_hpp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);						
		var sql = "call sp_brg_stok_hpp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);						

		var strSQL =  "select * from ( "+

					  "select a.kode_barang,a.nama,a.pabrik,a.kode_gudang,a.kode_pp,a.sat_kecil,f.akun_pers,f.akun_hpp "+					 
					  ",isnull(b.sawal,0)+isnull(c.beli,0)-isnull(d.sakhir,0) as jumlah, "+					  					  
					  "isnull(round(e.h_avg,2),0) as h_avg, "+
					  "round((isnull(b.sawal,0)+isnull(c.beli,0)-isnull(d.sakhir,0)) * isnull(e.h_avg,0),0) as hpp "+
					  
					  "from (select a.kode_barang,a.sat_kecil,'-' as pabrik,a.nama,b.kode_gudang,b.kode_pp,a.kode_lokasi,a.kode_klp "+
      				 		 "from brg_barang a cross join brg_gudang b "+
	 				 		 "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
					  ") a "+
					  "inner join brg_barangklp f on a.kode_klp=f.kode_klp and a.kode_lokasi=f.kode_lokasi "+

					  "left join (select kode_barang,kode_gudang,kode_lokasi,sum(jumlah) as sawal from brg_sawal "+
					           	 "where periode='"+this.e_periode.getText().substr(0,4)+"01' and kode_lokasi='"+this.app._lokasi+"' "+
							     "group by kode_lokasi,kode_barang,kode_gudang "+
							  	 ") b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi and a.kode_gudang=b.kode_gudang "+
					  
					  "left join (select kode_barang,kode_gudang,kode_lokasi,sum(jumlah+bonus) as beli "+
					             "from brg_trans_d "+
					             "where modul='BRGBELI' and periode like '"+this.e_periode.getText().substr(0,4)+"%' and periode <= '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							     "group by kode_lokasi,kode_barang,kode_gudang "+
							     ") c on a.kode_barang=c.kode_barang and a.kode_lokasi=c.kode_lokasi and a.kode_gudang=c.kode_gudang "+   	   	 
					 
					  "left join (select kode_barang,kode_gudang,kode_lokasi,sum(stok) as sakhir "+
					             "from brg_stok where kode_lokasi='"+this.app._lokasi+"' and nik_user ='"+this.nik_user+"' "+
							     "group by kode_lokasi,kode_barang,kode_gudang "+
								 ") d on a.kode_barang=d.kode_barang and a.kode_lokasi=d.kode_lokasi and a.kode_gudang=d.kode_gudang "+								 
					
					  "left join brg_hpp e on a.kode_barang=e.kode_barang and a.kode_lokasi=e.kode_lokasi and e.nik_user ='"+this.nik_user+"' "+
					  ") x where  x.hpp<>0 order by x.kode_barang ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
		
		var tot=0;
		for (var i=0;i<this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];												
			tot = tot + parseFloat(line.hpp);
		}
		this.e_total.setText(floatToNilai(tot));

		//--------- kode_barang tidak terdaftar -----
		this.brgIlegal = 0;

		var strSQL =  "select distinct a.kode_barang "+
					  "from brg_trans_d a left join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
					  "where b.kode_barang is null and a.modul='BRGBELI' and a.periode >= '"+this.e_periode.getText().substr(0,4)+"' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){			
			var line;
			this.sg2.clear();
			this.brgIlegal = 1;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];					
				this.sg2.appendData([line.kode_barang]);
			}
			setTipeButton(tbAllFalse);				
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			system.alert(this,"Terdapat Barang yang tidak terdaftar","");
		} 
		else {			
			this.sg2.clear(1);			
		}
								 
	},
	doTampilData: function(page) {
		try{
			this.sg.clear();
			var line;
			this.page = page;
			var start = (page - 1) * this.app._pageRow;
			var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
			for (var i=start;i<finish;i++){
				line = this.dataJU.rs.rows[i];		
				this.sg.appendData([line.kode_barang,line.nama,line.pabrik,line.kode_pp,line.sat_kecil,floatToNilai(line.jumlah),floatToNilai(line.h_avg),floatToNilai(line.hpp)]); 
			}
			this.sg.setNoUrut(start);
		}
		catch(e) {
			alert(e);
		}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_produk_rptJurnalHPP";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);			
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);						
			this.sg.clear(1);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.no_dokumen "+
					 "from trans_m a "+
					 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+					 			 					 				 					 
					 "where a.modul='IV' and a.form='BRGHPP' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.periode ='"+this.e_periode.getText()+"' ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.bTampil.setVisible(false);
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select no_dokumen,keterangan,nilai1 from trans_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.e_total.setText(floatToNilai(line.nilai1));
					}
				}																						
				var strSQL = "select a.kode_barang,a.nama,a.pabrik,a.sat_kecil,b.jumlah,b.h_avg,b.nilai_hpp as hpp,c.kode_pp, c.kode_gudang,f.akun_pers,f.akun_hpp "+
							 "from brg_barang a "+					 
							 "inner join brg_barangklp f on a.kode_klp=f.kode_klp and a.kode_lokasi=f.kode_lokasi "+
							 "inner join brg_hpp_d b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							 "inner join brg_gudang c on b.kode_gudang=c.kode_gudang and b.kode_lokasi=c.kode_lokasi "+
							 "where b.no_hpp='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);			
			
				
			}									
		} catch(e) {alert(e);}
	}	
});