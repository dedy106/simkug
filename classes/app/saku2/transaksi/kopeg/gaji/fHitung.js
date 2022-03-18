window.app_saku2_transaksi_kopeg_gaji_fHitung = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_gaji_fHitung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_gaji_fHitung";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Gaji: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Gaji",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_akun = new saiCBBL(this,{bound:[20,17,205,20],caption:"Akun Hutang", multiSelection:false, maxLength:10, tag:2});				
		this.cb_drk = new saiCBBL(this,{bound:[20,18,205,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);		
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);					
			this.cb_buat.setText(this.app._userLog);
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_gaji_fHitung.extend(window.childForm);
window.app_saku2_transaksi_kopeg_gaji_fHitung.implement({
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
					this.doClick();
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();															
					sql.add("insert into fri_gaji_m(no_gaji,kode_lokasi,periode,tanggal,keterangan,nik_buat,tgl_input,nik_user,posted,kode_akun,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"')");					
					
					sql.add("insert into fri_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_pp,kode_akun,periode,nilai,dc) "+
							"select '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_pp,w.kode_akun,'"+this.e_periode.getText()+"',a.nilai,w.dc "+
							"from fri_gaji_nik a "+
							"inner join karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+							
							"inner join fri_gaji_param w on a.kode_param=w.kode_param and a.kode_lokasi=w.kode_lokasi "+				
							"where w.jenis = 'I' and w.kode_lokasi='"+this.app._lokasi+"' ");														
					
					sql.add("insert into fri_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_pp,kode_akun,periode,nilai,dc) "+
							"select '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_pp,w.kode_akun,'"+this.e_periode.getText()+"',sum(a.nilai) as nilai,a.dc "+
							"from fri_gajiload_d a "+
							"inner join karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+							
							"inner join fri_gaji_param w on a.kode_param=w.kode_param and a.kode_lokasi=w.kode_lokasi "+											
							"where a.periode='"+this.e_periode.getText()+"' and w.jenis = 'L' and w.kode_lokasi='"+this.app._lokasi+"' group by a.nik,a.kode_param,a.kode_lokasi,x.kode_pp,w.kode_akun,a.dc ");		
					
					//RUMUS TKEL,PJAM,
					sql.add("insert into fri_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_pp,kode_akun,periode,nilai,dc) "+
							"select '"+this.e_nb.getText()+"',a.nik,'TKEL',a.kode_lokasi,x.kode_pp,w.kode_akun,'"+this.e_periode.getText()+"',round(a.nilai * 10/100,0) as nilai,w.dc "+
							"from fri_gaji_nik a "+
							"inner join karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+							
							"inner join fri_gaji_param w on w.kode_param='TKEL' and w.kode_lokasi='"+this.app._lokasi+"' "+				
							"where a.kode_param='GPOK' and a.kode_lokasi='"+this.app._lokasi+"' and x.sts_pajak<>'TK/00'");																
					sql.add("insert into fri_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_pp,kode_akun,periode,nilai,dc) "+
							"select '"+this.e_nb.getText()+"',a.nik,'TJAM',a.kode_lokasi,a.kode_pp,c.kode_akun,'"+this.e_periode.getText()+"',0.0424*isnull(b.nilai,0),c.dc "+
							"from karyawan a "+
							"inner join (select a.nik,a.kode_lokasi, "+
							"				   sum(case when a.kode_param in ('GPOK','TJAB','TKEL') then a.nilai else 0 end) as nilai "+
							"			from fri_gaji_d a  "+
							"			group by a.nik,a.kode_lokasi "+
							"			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"inner join fri_gaji_param c on c.kode_param='TJAM' and a.kode_lokasi=c.kode_lokasi ");
					sql.add("insert into fri_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_pp,kode_akun,periode,nilai,dc) "+
							"select '"+this.e_nb.getText()+"',a.nik,'PJAM',a.kode_lokasi,a.kode_pp,c.kode_akun,'"+this.e_periode.getText()+"',0.0424*isnull(b.nilai,0),c.dc "+
							"from karyawan a "+
							"inner join (select a.nik,a.kode_lokasi, "+
							"				   sum(case when a.kode_param in ('GPOK','TJAB','TKEL') then a.nilai else 0 end) as nilai "+
							"			from fri_gaji_d a  "+
							"			group by a.nik,a.kode_lokasi "+
							"			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"inner join fri_gaji_param c on c.kode_param='PJAM' and a.kode_lokasi=c.kode_lokasi ");
					sql.add("insert into fri_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_pp,kode_akun,periode,nilai,dc) "+
							"select '"+this.e_nb.getText()+"',a.nik,'PADP',a.kode_lokasi,a.kode_pp,c.kode_akun,'"+this.e_periode.getText()+"',0.02*isnull(b.nilai,0),c.dc "+
							"from karyawan a "+
							"inner join (select a.nik,a.kode_lokasi, "+
							"				   sum(case when a.kode_param in ('GPOK','TJAB','TKEL') then a.nilai else 0 end) as nilai "+
							"			from fri_gaji_d a  "+
							"			group by a.nik,a.kode_lokasi "+
							"			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"inner join fri_gaji_param c on c.kode_param='PADP' and a.kode_lokasi=c.kode_lokasi ");		
								
					sql.add("insert into fri_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_pp,kode_akun,periode,nilai,dc) "+
							"select '"+this.e_nb.getText()+"',x.nik,'PPJK',x.kode_lokasi,b.kode_pp,'-' as kode_akun,'"+this.e_periode.getText()+"',"+
							"case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - (isnull(c.padp,0)*12) - y.kurang_seb) * y.persen/100)) / 12,0) end "+
							",'-' as dc "+
							"from (select a.nik,a.kode_lokasi,(sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from fri_gaji_d a  "+
							"	  inner join fri_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join fri_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+
							"	 and  b.dc='D'  "+
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join fri_gaji_param z on z.kode_param='PPJK' and z.kode_lokasi='"+this.app._lokasi+"' "+
							"left join fri_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+
							"left join (select a.nik,a.kode_lokasi,sum(a.nilai) as padp "+
							"			from fri_gaji_d a  "+
							"			where a.kode_param='PADP' "+
							"			group by a.nik,a.kode_lokasi "+
							"		   )c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi ");
									   
							
					
					sql.add("insert into fri_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,kode_akun,'"+this.e_ket.getText()+"',dc,sum(nilai),kode_pp,'"+this.cb_drk.getText()+"','"+this.app._lokasi+"','GAJI','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from fri_gaji_d where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_akun,dc,kode_pp");					
					sql.add("insert into fri_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',sum(case dc when 'D' then nilai else -nilai end),'"+this.app._kodePP+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','GAJI','HUTANG','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from fri_gaji_d where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);		
		this.doClick();
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
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
