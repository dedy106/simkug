window.app_saku3_transaksi_travel_aset_fFasusutReg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_aset_fFasusutReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_aset_fFasusutReg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyusutan Aktiva Tetap Reguler", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.bTampil = new portalui_button(this,{bound:[690,17,80,18],caption:"Hitung",click:[this,"doLoadData"]});		
		this.e_nilai = new saiLabelEdit(this,{bound:[810,17,200,20],caption:"Total Penyusutan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
			
		this.pc1 = new pageControl(this,{bound:[20,12,995,356], childPage:["Item Jurnal"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
		            colTitle:["Akun BP","Nama Akun","Akun Deprs","Nama Akun","PP Susut","Nama PP","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,150,80,220,80,220,80]],
					colFormat:[[6],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_aset_fFasusutReg.extend(window.childForm);
window.app_saku3_transaksi_travel_aset_fFasusutReg.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti","RSU/"+this.e_periode.getText().substr(2,4)+"/","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AT','SUSUTREG','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_nilai.getText())+",0,0,'"+this.app._userLog+"','-','-','-','-','-','-','-','-')");
							
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_bp+"','D',"+line.nilai_susut+","+
								line.nilai_susut+",'"+this.e_ket.getText()+"','AT','BP','IDR',1,'"+line.kode_pp_susut+"','-','-','-','-','-','-','-','-')");
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_deprs+"','C',"+line.nilai_susut+","+
								line.nilai_susut+",'"+this.e_ket.getText()+"','AT','AP','IDR',1,'"+line.kode_pp_susut+"','-','-','-','-','-','-','-','-')");
					}
					
					//hanya yg flag_susutnya == 1 yg bisa susut (tanah flag_susutny == 0 / gak boleh susut)		
					sql.add("insert into fasusut_d(no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_akun,kode_pp,kode_drk,dc,no_del,nilai_aset,umur) "+
							"  select '"+this.e_nb.getText()+"',a.no_fa,'"+this.e_periode.getText()+"', "+

							"	  case when (zz.nilai-a.nilai_residu-a.akum_nilai-isnull(b.tot_susut,0)) > ceiling((zz.nilai-a.akum_nilai)/a.umur) "+
							"	  	   then ceiling((zz.nilai-a.akum_nilai)/a.umur) "+
							"		   else (zz.nilai-a.nilai_residu-a.akum_nilai-isnull(b.tot_susut,0)) end "+
							" 	  as nilai_susut, "+

							"	  a.kode_lokasi,c.akun_bp,c.akun_deprs,c.kode_akun,a.kode_pp_susut,c.kode_drk,'D','-',(zz.nilai - a.akum_nilai),a.umur "+

							"  from fa_asset a "+						
							"	  inner join fa_klpakun c on a.kode_klpakun=c.kode_klpakun and a.kode_lokasi=c.kode_lokasi and c.flag_susut='1' "+							
							"     inner join (select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							"                 from fa_nilai where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"		 		  group by kode_lokasi,no_fa) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+
 
							"	  left join  "+
							"	             (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
							"		 		  from fasusut_d where kode_lokasi = '"+this.app._lokasi+"' and no_del='-' "+
							"		 		  group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+

							"  where a.jenis = 'A' and a.umur <> 0 and progress = '2' and (zz.nilai-a.nilai_residu-a.akum_nilai) > isnull(b.tot_susut,0) and a.kode_lokasi='"+this.app._lokasi+"' and a.periode_susut<='"+this.e_periode.getText()+"' "); 
					
					var perNext = nextNPeriode(this.e_periode.getText(),1);
					sql.add("update a set periode_susut='"+perNext+"' "+
							"from fa_asset a inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_fasusut='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.sg.setTag("0");					
					this.dataJU = {rs:{rows:[]}};
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :																
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai penyusutan tidak boleh nol atau kurang.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"AT",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AT - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;									
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.doClick();		
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti","RSU/"+this.e_periode.getText().substr(2,4)+"/","0000"));
		this.e_ket.setFocus();		
	},
	doLoadData: function(sender){
		//hanya yg flag_susutnya == 1 yg bisa susut (tanah flag_susutny == 0 / gak boleh susut)				
		var tahun = this.e_periode.getText().substr(0,4);
		this.e_nilai.setText("0");		

		var strSQL = "select b.akun_bp,x.nama as nama_bp,b.akun_deprs,y.nama as nama_deprs,a.kode_pp_susut,c.nama as nama_pp, "+

						"sum(case when (zz.nilai-a.nilai_residu-a.akum_nilai-isnull(d.tot_susut,0)) > ceiling((zz.nilai-isnull(a.akum_nilai,0))/a.umur) "+
						"		   then ceiling((zz.nilai-isnull(a.akum_nilai,0))/a.umur)  "+
						"		   else ceiling(zz.nilai-a.nilai_residu-isnull(a.akum_nilai,0)-isnull(d.tot_susut,0)) end) "+						 
						"as nilai_susut "+

						"from fa_asset a "+
						"inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi and b.flag_susut='1' "+

						"inner join (select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						"            from fa_nilai where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						"            group by kode_lokasi,no_fa "+
						"		      ) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+						
						
						"inner join pp c on a.kode_pp_susut=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"inner join masakun x on b.akun_bp=x.kode_akun and x.kode_lokasi=a.kode_lokasi "+
						"inner join masakun y on b.akun_deprs=y.kode_akun and y.kode_lokasi=a.kode_lokasi "+

						"left join "+
						"   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						"	  from fasusut_d where kode_lokasi = '"+this.app._lokasi+"' and no_del='-' "+
						"	  group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+					 

						"where a.jenis = 'A' and a.umur <> 0 and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' and (zz.nilai-isnull(a.akum_nilai,0)-a.nilai_residu) > isnull(d.tot_susut,0) and a.periode_susut <= '"+this.e_periode.getText()+"' "+
						"group by b.akun_bp,b.akun_deprs,a.kode_pp_susut,c.nama,x.nama,y.nama "+

						"order by b.akun_bp";		
						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai_susut);												
			}		

			this.e_nilai.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} else this.sg.clear(1);						
	},
	doChange:function(sender){
		if (sender == this.e_periode) {			
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.akun_bp,line.nama_bp,line.akun_deprs,line.nama_deprs,line.kode_pp_susut,line.nama_pp,floatToNilai(line.nilai_susut)]);
		}
		this.sg.setNoUrut(start);
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
							this.nama_report="server_report_saku3_travel_rptFaJurnal";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
							this.filter2=this.e_periode.getText()+"/";
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
							this.pc1.hide();								
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
				this.pc1.show();   
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
			this.sg.setTag("0");
			this.dataJU = {rs:{rows:[]}};
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});