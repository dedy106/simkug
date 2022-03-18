window.app_saku2_transaksi_gaji_fHitungPol = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fHitungPol.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fHitungPol";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Gaji: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Gaji",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});		
		this.e_pesan = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Pesan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1});	
		this.cb_app = new saiCBBL(this,{bound:[20,17,205,20],caption:"NIK Approval", multiSelection:false, maxLength:10, tag:1});		
		//this.bSimulasi = new button(this,{bound:[840,16,80,18],caption:"Simulasi",click:[this,"doHitung"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,340], childPage:["Data Status Karyawan","Detail Parameter"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Status","Kode","Status Karyawan"],
					colWidth:[[2,1,0],[300,100,80]],
					columnReadOnly:[true,[0,1,2],[]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","NON"]})]],
					autoAppend:false,defaultRow:1});	
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Status","Kode","Nama Parameter","Flag Rumus"],
					colWidth:[[3,2,1,0],[80,300,100,80]],
					columnReadOnly:[true,[0,1,2,3],[]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","NON"]})]],
					autoAppend:false,defaultRow:1});
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:39,tag:9,
		            colTitle:["NIK","NAMA","STS PJK","STS KAR","JAB","LOKER","HK","UHAR","GDAS","TPOS",
					          "TPRES","TSUS","TRANS","HT","TH","REM","RTPRES","INS","CUTI","BAS",
							  "THR","BONUS","RGDAS","RAPLL","PTRANS","PREM","PDPT","IK","PA","HP",
							  "POT","CLAIN","LMBR","SALDO","JAMSOS","JIWAS","AKDHK","PPH","PERIODE KERJA"],
					colWidth:[[38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
			                  [100,100,100,100,100,100,100,100,100,  100,100,100,100,100,100,100,100,100,100,  100,100,100,100,100,100,100,100,100,100,  100,100,80,80,80,80,80,80,100,80]],	
					colFormat:[[6,7,8,9, 10,11,12,13,14,15,16,17,18,19, 20,21,22,23,24,25,26,27,28,29, 30,31,32,33,34,35,36,37],
				              [cfNilai,cfNilai,cfNilai,cfNilai, 
							  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, 
							  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
							  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg3});
					
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_buat.setSQL("select nik, nama from hr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_app.setSQL("select nik, nama from hr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select sts_sdm,nama from hr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["PROSES",line.sts_sdm,line.nama]);
				}
			} else this.sg.clear(1);	
			
			var data = this.dbLib.getDataProvider("select kode_param,nama,flag_rumus,flag_rutin from hr_gaji_param where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];			
					if (line.flag_rutin == "1") var vStatus = "PROSES"; else var vStatus = "NON";
					this.sg2.appendData([vStatus,line.kode_param,line.nama,line.flag_rumus]);
				}
			} else this.sg2.clear(1);					
			this.cb_buat.setText(this.app._userLog);
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GAJIHUT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GAJIHUT") this.akunHutang = line.flag;								
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fHitungPol.extend(window.childForm);
window.app_saku2_transaksi_gaji_fHitungPol.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var status = ""; 
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i)=="PROSES") {
							status += ",'"+this.sg.cells(1,i)+"'";
						}			
					}
					status = status.substr(1);			
					if (status == "") status = "''";
					
					var kodeparam = ""; 
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES") {
							kodeparam += ",'"+this.sg2.cells(1,i)+"'";
						}			
					}
					kodeparam = kodeparam.substr(1);			
					if (kodeparam == "") kodeparam = "''";
									
					sql.add("insert into hr_gaji_m(no_gaji,kode_lokasi,periode,tanggal,keterangan,tgl_transfer,nik_buat,tgl_input,nik_user,no_kas,nik_app,pesan) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','-','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"')");					
					
					sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai,dc,kode_drk) "+
							"select distinct '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_loker,w.kode_akun,'"+this.e_periode.getText()+"',a.nilai,w.dc,w.kode_drk "+
							"from hr_gaji_nik a "+
							"inner join hr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"inner join hr_gaji_param w on a.kode_param=w.kode_param and a.kode_lokasi=w.kode_lokasi "+				
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param in ("+kodeparam+") and x.sts_sdm in ("+status+")");		
							
					
					sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai,dc,kode_drk) "+
							"select '"+this.e_nb.getText()+"',a.nik,'TPPH',a.kode_lokasi,xx.kode_loker,yy.kode_akun as kode_akun,'"+this.e_periode.getText()+"',a.pph21 as nilai,'D',yy.kode_drk "+
							"from  "+							
							"		(select x.nik,x.kode_lokasi,case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21 "+		
							"	 	from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"	 		     sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		         sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		         d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		         case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		         else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		         (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		         case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		         else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	          from hr_gaji_d a  "+
							"	              inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.flag_pajak='1' "+
							"	              inner join hr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	              inner join hr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi  "+ 
							"			  where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"	              group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	         ) x left join hr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"	    where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 ) a "+														
							"	 inner join hr_karyawan xx on a.nik=xx.nik and a.kode_lokasi=xx.kode_lokasi "+
							"    inner join hr_gaji_param yy on yy.kode_param='TPPH' and a.kode_lokasi=yy.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"'");
							
							
					sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai,dc,kode_drk) "+
							"select no_gaji,nik,'PPPH',kode_lokasi,kode_loker,kode_akun,periode,nilai,'C',kode_drk "+
							"from hr_gaji_d where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_param='TPPH'");

					sql.add("insert into hr_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,b.kode_akun,'"+this.e_ket.getText()+"',b.dc,'IDR',1,sum(nilai),sum(nilai),d.kode_pp,a.kode_drk,a.kode_lokasi,'GAJI','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate() "+
							"from hr_gaji_d a inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"                 inner join hr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"                 inner join hr_loker d on c.kode_loker=d.kode_loker and d.kode_lokasi=c.kode_lokasi "+
							"where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by b.kode_akun,b.dc,d.kode_pp,a.kode_drk,a.kode_lokasi");
					sql.add("insert into hr_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C','IDR',1,sum(case b.dc when 'D' then nilai else -nilai end),sum(case b.dc when 'D' then nilai else -nilai end),d.kode_pp,'-',a.kode_lokasi,'GAJI','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate() "+
							"from hr_gaji_d a inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"                 inner join hr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"                 inner join hr_loker d on c.kode_loker=d.kode_loker and d.kode_lokasi=c.kode_lokasi "+
							"where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by d.kode_pp,a.kode_lokasi");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
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



